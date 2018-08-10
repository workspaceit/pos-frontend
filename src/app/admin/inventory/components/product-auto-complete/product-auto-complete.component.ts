import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {ProductService} from '../../../../services/product.service';
import {ProductSearchForm} from '../../../../models/form/product/product-search-form';
import {ProductAutoCompleteCommunicator} from '../../../../communicator/product-auto-complete-communicator';
import {delay} from 'q';

@Component({
  selector: 'app-product-auto-complete',
  templateUrl: './product-auto-complete.component.html',
  styleUrls: ['./product-auto-complete.component.css']
})
export class ProductAutoCompleteComponent implements OnInit {
  asyncProductNameSelected: string;
  asyncBarcodeSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  productNameDataSource: Observable<any>;
  barcodeDataSource: Observable<any>;
  timout:any;
  constructor(private productService: ProductService,private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator) {
    this.timout = null;
    this.productNameDataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncProductNameSelected);
    }).mergeMap((token: string) => this.getProductByNameAsObservable(token));
    this.barcodeDataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncBarcodeSelected);
    }).mergeMap((token: string) => this.getProductByBarcodeAsObservable(token));

  }

  ngOnInit() {
  }

  getProductByNameAsObservable(token: string): Observable<any> {

    const fn = () => {
      return new Observable((observer) => {


        const productSearchForm: ProductSearchForm = new ProductSearchForm();
        productSearchForm.name = token;
        this.productService.getProductsBySearchCriteria(10,1,productSearchForm).subscribe((data)=>{
          console.log('data',data);
          observer.next(data.result);
        });

      });
    };

    return fn();


  }
  getProductByBarcodeAsObservable(token: string): Observable<any> {

    const fn = () => {
      return new Observable((observer) => {



        if(this.timout!=null){
          clearTimeout(this.timout);
        }
        this.timout = setTimeout(()=>{
          console.log("token",token);
          this.productService.getProductByBarCode(Number(token)).subscribe((data)=>{
            console.log("data",data);
            if(data!=null || data.id>0){
              this.asyncBarcodeSelected = '';
              this.productAutoCompleteCommunicator.publishSelectedProduct(data);
            }
          });
        },200);


      });
    };

    return fn();


  }
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.item);
    this.productAutoCompleteCommunicator.publishSelectedProduct(e.item);
    console.log('Selected value: ', e.value);
    this.asyncProductNameSelected = '';
    this.asyncBarcodeSelected = '';
  }

}

