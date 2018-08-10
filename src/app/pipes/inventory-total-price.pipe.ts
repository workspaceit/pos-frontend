import {Pipe,PipeTransform} from '@angular/core';
import {Cart} from '../models/form/cart';

@Pipe({name:'totalPurchasedProduct'})
export class InventoryTotalPricePipe implements PipeTransform {
  transform(cart: Cart): number {
    let totalPrice = 0;
    console.log("DFDF")
    // console.log(this.cart.cartDetails.length);
    for(const cartDetails of cart.cartDetails){


      const totalPerProductPrice =  cartDetails.inventoryForm.purchaseQuantity*cartDetails.inventoryForm.purchaseQuantity;
      totalPrice += totalPerProductPrice;
    }
    return totalPrice;
  }

}
