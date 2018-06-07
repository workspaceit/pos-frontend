import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {ProductSearchForm} from '../../../../models/form/product/product-search-form';
import {Product} from '../../../../models/data/product';
import {ProductListResponse} from '../../../../models/response-models/product-list-response';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css'],
  providers: [ProductService]
})
export class ProductPurchaseComponent implements OnInit {
  products: Product[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.getProduct();
  }
  private getProduct(){
    const productSearchForm: ProductSearchForm = new ProductSearchForm();
    productSearchForm.name = 'd';
    this.productService.getProductsBySearchCriteria(5,1,productSearchForm).subscribe((data)=>{
      console.log(data);
      const productListResponse: ProductListResponse = data;
      this.products = productListResponse.result;
      console.log(this.products);
    });
  }
}
