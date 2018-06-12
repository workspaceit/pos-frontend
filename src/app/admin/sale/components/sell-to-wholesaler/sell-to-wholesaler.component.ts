import { Component, OnInit } from '@angular/core';
import {LedgerService} from '../../../../services/ledger-service';
import {Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {InventoryService} from '../../../../services/inventory-service';
import {ProductAutoCompleteCommunicator} from '../../../../communicator/product-auto-complete-communicator';
import {Ledger} from '../../../../models/data/accounting/ledger';
import {Inventory} from '../../../../models/data/Inventory';
import {Product} from '../../../../models/data/product';
import {Wholesaler} from '../../../../models/data/wholesaler';
import {WholesalerService} from '../../../../services/wholesaler.service';

@Component({
  selector: 'app-sell-to-wholesaler',
  templateUrl: './sell-to-wholesaler.component.html',
  styleUrls: ['./sell-to-wholesaler.component.css'],
  providers: [ProductService,
    InventoryService,
    LedgerService,
    WholesalerService,
    ProductAutoCompleteCommunicator]
})
export class SellToWholesalerComponent implements OnInit {
  private paymentLedgers:Ledger[];
  private wholesalers:Wholesaler[];
  private inventories:Inventory[];
  private products:Product[];
  constructor(private productService:ProductService,
              private inventoryService: InventoryService,
              private ledgerService: LedgerService,
              private wholesalerService:WholesalerService,
              private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator,
              private router: Router) {
    this.inventories = [];
    this.products = [];
    productAutoCompleteCommunicator.onProductSelect.subscribe((product)=>{
        const flag:boolean = this.isProductExistInCart(product);

        if(flag)return;

        product.inventories = [];
        this.inventoryService.getByProductId(product.id).subscribe((data)=>{
         if(data.length===0){
           console.log('0 Inventory');
         }

         product.inventories = product.inventories.concat(data);
         this.products.push(product);
        });
    });
  }

  ngOnInit() {
    const componentRef = this;
    /*(<any>$('#saleDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
    //  componentReff.purchaseCreateForm.shipment.purchaseDate = (<any>$)(this).val();
    });*/
    /**
     * API to fetch necessary data
     * */
    this.getLedger();
    this.getWholesaler();
  }
  public isProductExistInCart(product:Product){
   const existingProduct =  this.products.find(value => product.id === value.id);
   return existingProduct==undefined || existingProduct==null?false:true;
  }
  public getLedger(){
    this.ledgerService.getBankOrCashAccount().subscribe((data)=>{
      this.paymentLedgers = data;
    });
  }
  public getWholesaler(){
    this.wholesalerService.getWholesalers().subscribe((data)=>{
      this.wholesalers = data;
      console.log('this.suppliers',this.wholesalers);
    });
  }
  public removeInventoryFromCart(productIndex,inventoryIndex){
    const inventories = this.products[productIndex].inventories;
    inventories.splice(inventoryIndex,1);
    if(inventories.length==0){
      this.removeProductFromCart(productIndex);
    }
  }
  public removeProductFromCart(productIndex){
    this.products.splice(productIndex,1);
  }
}
