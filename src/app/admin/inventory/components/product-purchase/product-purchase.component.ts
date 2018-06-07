import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/data/product';
import {ProductAutoCompleteCommunicator} from '../../../../communicator/product-auto-complete-communicator';
import {InventoryService} from '../../../../services/inventory-service';
import {environment} from '../../../../../environments/environment';
import {InventoryCreateForm} from '../../../../models/form/inventory-create-form';
import {Cart} from '../../../../models/data/cart';


@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css'],
  providers: [ProductService,InventoryService,ProductAutoCompleteCommunicator]
})
export class ProductPurchaseComponent implements OnInit {
  cart: Cart;
  modalProductDetails: Product;
  imgUrl= environment.imgUrl;

  constructor(private productService:ProductService,
              private inventoryService: InventoryService,
              private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator) {
    this.modalProductDetails = new Product();
    this.cart=new Cart();
    this.cart.products = [];
    this.cart.invetoryForms = [];
    productAutoCompleteCommunicator.onProductSelect.subscribe((data)=>{
      const alreadyExistingProduct = this.cart.products.find(value => data.name===value.name);



      if(alreadyExistingProduct === undefined || alreadyExistingProduct ===null){
        const inventoryCreateForm: InventoryCreateForm = new InventoryCreateForm();
        inventoryCreateForm.productId = data.id;

        this.cart.products.push(data);
        this.cart.invetoryForms.push(inventoryCreateForm);
      }

    });
  }

  ngOnInit() {

  }
  public removeProductFromCart(index:number){
    this.cart.products.splice(index,1);
    this.cart.invetoryForms.splice(index,1);
  }
  public showProductModal(index){
    console.log(this.cart);
    this.modalProductDetails = this.cart.products[index];
    console.log(' this.products',this.modalProductDetails);
    (<any>$('#productDetailModal')).modal('show');
  }



}
