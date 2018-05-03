import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../models/data/product';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  limit = 10;
  offset = 1;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getPaginatedProducts(this.limit, this.offset).subscribe(
      data => {
        this.products = data.result;
      },
      error => {

      }
    );
  }

}
