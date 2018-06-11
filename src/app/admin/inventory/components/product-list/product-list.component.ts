import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../models/data/product';
import {ProductService} from '../../../../services/product.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  imgUrl= environment.imgUrl;

  limit = 10;
  offset = 1;
  currentPage = 1;
  count = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.offset = (this.currentPage * this.limit) - this.limit;
    if(this.offset <=0) {
      this.offset = 1;
    }
    this.getProducts();
  }

  getProducts(){
    this.productService.getPaginatedProducts(this.limit, this.offset).subscribe(
      data => {
        this.products = data.result;
        this.count = data.totalResult;
        console.log(data.result);
      },
      error => {

      }
    );
  }
  pageChanged(pageNumber) {
    this.offset = ((pageNumber * this.limit) - this.limit) === 0 ? 1 :((pageNumber * this.limit) - this.limit) ;
    this.getProducts();
    this.currentPage = pageNumber;
  }

}
