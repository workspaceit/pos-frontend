import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {ProductService} from '../../../../services/product.service';
import {ProductSearchForm} from '../../../../models/form/product/product-search-form';
import {ProductAutoCompleteCommunicator} from '../../../../communicator/product-auto-complete-communicator';

@Component({
  selector: 'app-product-auto-complete',
  templateUrl: './product-auto-complete.component.html',
  styleUrls: ['./product-auto-complete.component.css']
})
export class ProductAutoCompleteComponent implements OnInit {
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;

  constructor(private productService: ProductService,private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator) {
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => this.getStatesAsObservable(token));
  }

  ngOnInit() {
  }

  getStatesAsObservable(token: string): Observable<any> {

    const query = new RegExp(token, 'ig');
    const fn = () => {
      return new Observable((observer) => {
        console.log(token);
        const productSearchForm: ProductSearchForm = new ProductSearchForm();
        productSearchForm.name = token;
        this.productService.getProductsBySearchCriteria(10,1,productSearchForm).subscribe((data)=>{
          console.log("data",data);
          observer.next(data.result);
        });
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
    this.asyncSelected = '';
  }

}

