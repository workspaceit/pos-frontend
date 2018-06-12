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
import {PaymentLedgerForm} from '../../../../models/form/purchase-payment-create-form';
import {SaleForm} from '../../../../models/form/sale/sale-form';
import {SaleCart} from '../../../../models/form/sale/sale-cart';
import {SaleCartProduct} from '../../../../models/form/sale/sale-cart-product';
import {SaleCartInventory} from '../../../../models/form/sale/sale-cart-inventory';
import {InventorySaleForm} from '../../../../models/form/sale/inventory-sale-form';

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
  protected saleForm:SaleForm;
  protected saleCart:SaleCart;
  protected paymentLedgers:Ledger[];
  protected wholesalers:Wholesaler[];
  protected inventories:Inventory[];
  protected products:Product[];
  protected paymentAccount:PaymentLedgerForm[];

  constructor(private productService:ProductService,
              private inventoryService: InventoryService,
              private ledgerService: LedgerService,
              private wholesalerService:WholesalerService,
              private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator,
              private router: Router) {
    this.inventories = [];
    this.products = [];
    this.paymentAccount = [];
    this.saleForm = new SaleForm();
    this.saleCart = new SaleCart();
    this.saleCart.saleCartProduct = [];

    const paymentLedgerForm:PaymentLedgerForm = new PaymentLedgerForm();
    paymentLedgerForm.amount=null;
    paymentLedgerForm.ledgerId=0;

    this.paymentAccount.push(paymentLedgerForm);

    productAutoCompleteCommunicator.onProductSelect.subscribe((product)=>{
        this.addProductToCart(product);
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
  public addProductToCart(product:Product){
    const flag:boolean = this.isProductExistInCart(product);

    if(flag)return;

    product.inventories = [];
    this.inventoryService.getByProductId(product.id).subscribe((data)=>{
      if(data.length===0){
        console.log('0 Inventory');
        return;
      }

      product.inventories = product.inventories.concat(data);
      this.products.push(product);

      const saleCartProduct:SaleCartProduct = new SaleCartProduct();
      saleCartProduct.product = product;
      saleCartProduct.saleCartInventory = [] ;

      for(const inventory of product.inventories){
        const saleCartInventory = new SaleCartInventory();
        const inventorySaleForm = new InventorySaleForm();

        inventorySaleForm.inventoryId = inventory.id;
        inventorySaleForm.quantity = 0;
        inventorySaleForm.sellingPrice = 0;

        saleCartInventory.inventory = inventory;
        saleCartInventory.inventorySaleForm = inventorySaleForm;

        saleCartProduct.saleCartInventory.push(saleCartInventory);
      }


      this.saleCart.saleCartProduct.push(saleCartProduct);

    });
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

    this.saleCart.saleCartProduct[productIndex].saleCartInventory.splice(inventoryIndex,1);
    const saleCartInventoryLength = this.saleCart.saleCartProduct[productIndex].saleCartInventory.length;
    if(saleCartInventoryLength===0){
      this.removeProductFromCart(productIndex);
    }
  }
  public removeProductFromCart(productIndex){
    this.saleCart.saleCartProduct.splice(productIndex,1);
  }
  public addPaymentAccount(){
    console.log("ASDASD");
    const paymentAccount: PaymentLedgerForm = new PaymentLedgerForm();
    paymentAccount.ledgerId = 0;

    this.paymentAccount.push(paymentAccount);
  }
  public removePaymentAccount(index:number){
    this.paymentAccount.splice(index,1);
  }
}
