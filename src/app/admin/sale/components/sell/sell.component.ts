import { Component, OnInit } from '@angular/core';
import {LedgerService} from '../../../../services/ledger-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {InventoryService} from '../../../../services/inventory-service';
import {ProductAutoCompleteCommunicator} from '../../../../communicator/product-auto-complete-communicator';
import {Ledger} from '../../../../models/data/accounting/ledger';
import {Inventory} from '../../../../models/data/Inventory';
import {Product} from '../../../../models/data/product';
import {Wholesaler} from '../../../../models/data/wholesaler';
import {WholesalerService} from '../../../../services/wholesaler.service';
import {SaleForm} from '../../../../models/form/sale/sale-form';
import {SaleCart} from '../../../../models/form/sale/sale-cart';
import {SaleCartProduct} from '../../../../models/form/sale/sale-cart-product';
import {SaleCartInventory} from '../../../../models/form/sale/sale-cart-inventory';
import {InventorySaleForm} from '../../../../models/form/sale/inventory-sale-form';
import {InventorySearchForm} from '../../../../models/form/inventory/inventory-search-form';
import {PRODUCT_CONDITION} from '../../../../models/constant/PRODUCT_CONDITION';
import {SaleService} from '../../../../services/sale.service';
import {SALE_TYPE} from '../../../../models/constant/SALE_TYPE';
import {ConsumerService} from '../../../../services/consumer.service';
import {Consumer} from '../../../../models/data/consumer';
import {ConsumerForm} from '../../../../models/form/consumer-form';
import {PersonalInfoForm} from '../../../../models/form/personal-info-form';
import {PaymentLedgerForm} from '../../../../models/form/payment-ledger-form';

@Component({
  selector: 'app-sell-to-wholesaler',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  providers: [ProductService,
    InventoryService,
    LedgerService,
    WholesalerService,
    ConsumerService,
    SaleService,
    ProductAutoCompleteCommunicator]
})
export class SellComponent implements OnInit {
  protected _SALE_TYPE;
  protected saleForm:SaleForm;
  protected saleCart:SaleCart;
  protected paymentLedgers:Ledger[];
  protected wholesalers:Wholesaler[];
  protected consumers:Consumer[];
  protected inventories:Inventory[];
  protected products:Product[];
  protected inventorySearchForm:InventorySearchForm;
  protected errors=[];
  protected modalProductDetails:Product;

  constructor(private productService:ProductService,
              private inventoryService: InventoryService,
              private ledgerService: LedgerService,
              private wholesalerService:WholesalerService,
              private saleService:SaleService,
              private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator,
              private consumerService:ConsumerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.paymentLedgers = [];
    this.wholesalers=[];
    this.consumers=[];
    this._SALE_TYPE = SALE_TYPE;
    this.saleForm = new SaleForm();
    this.saleCart = new SaleCart();
    this.saleForm.consumerInfo = new ConsumerForm();
    this.saleForm.consumerInfo.personalInfo = new PersonalInfoForm();
    this.modalProductDetails = new Product();
    this.inventorySearchForm = new InventorySearchForm();


    this.saleForm.wholesalerId = 0;
    this.saleForm.consumerInfoId = 0;
    this.inventories = [];
    this.products = [];
    this.saleForm.paymentAccount = [];
    this.saleCart.saleCartProduct = [];
    this.inventorySearchForm.condition = 'ALL';

    const paymentLedgerForm:PaymentLedgerForm = new PaymentLedgerForm();
    paymentLedgerForm.amount=null;
    paymentLedgerForm.ledgerId=0;

    this.saleForm.paymentAccount.push(paymentLedgerForm);

    productAutoCompleteCommunicator.onProductSelect.subscribe((product)=>{
        this.getInventoryByProductId(product);
    });


    this.activatedRoute.params.subscribe(
      params => {
        const saleType = params['saleType'];
        switch(saleType){
          case 'wholesale':
            this.saleForm.type = SALE_TYPE.WHOLESALE;
            break;
          case 'consumer':
            this.saleForm.type = SALE_TYPE.CONSUMER_SALE;
            break;
          default:
            this.router.navigate(['404']).then();
        }
      }
    );
  }

  ngOnInit() {
    console.log( this.saleForm.type);
    const componentRef = this;
    (<any>$('#saleDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
      componentRef.saleForm.date = (<any>$)(this).val();
    });
    /**
     * API to fetch necessary data
     * */
    this.getLedger();
    this.getWholesaler();
    this.getConsumers();
  }
  public getInventoryByProductId(product:Product){
    const flag:boolean = this.isProductExistInCart(product);
    console.log(this.inventorySearchForm.condition);
    if(flag)return;

    product.inventories = [];
    let productCondition:PRODUCT_CONDITION=null;
    const condition = this.inventorySearchForm.condition;
    switch(condition){
      case 'GOOD':
        productCondition = PRODUCT_CONDITION.GOOD;
        break;
      case 'DAMAGED':
        productCondition = PRODUCT_CONDITION.DAMAGED;
        break;
    }

    if(productCondition===null){

      this.inventoryService.getByProductId(product.id).subscribe((data)=>{
        this.addToCart(data,product);
      });
    }else{
      this.inventoryService.getByProductIdAndCondition(product.id,productCondition).subscribe((data)=>{
        this.addToCart(data,product);
      });
    }

  }
  public addToCart(data:Inventory[],product:Product){
    if(data.length===0){
      alert('Product sold out');
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
      inventorySaleForm.quantity = null;
      inventorySaleForm.sellingPrice = null;

      saleCartInventory.inventory = inventory;
      saleCartInventory.inventorySaleForm = inventorySaleForm;
      saleCartInventory.inventorySaleForm.sellingPrice = saleCartInventory.inventory.sellingPrice;
      saleCartInventory.inventorySaleForm.quantity = 1;

      saleCartProduct.saleCartInventory.push(saleCartInventory);
    }


    this.saleCart.saleCartProduct.push(saleCartProduct);
  }
  public isProductExistInCart(product:Product){
   const existingProduct =  this.saleCart.saleCartProduct.find(value => value.product.id==product.id);


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
  public getConsumers(){
    this.consumerService.getByAll().subscribe((data)=>{
      this.consumers = data;
      console.log('this.consumers',this.consumers);
    });
  }
  public getNewConsumerFormAndCloseModal(){
    this.consumerService.getNewForml().subscribe((data)=>{
      this.saleForm.consumerInfo = data;
      (<any>$('#consumerForm')).modal('hide');
    });

  }
  public getNewConsumerForm(){
    this.consumerService.getNewForml().subscribe((data)=>{
      this.saleForm.consumerInfo = data;
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
    const paymentAccount: PaymentLedgerForm = new PaymentLedgerForm();
    paymentAccount.ledgerId = 0;

    this.saleForm.paymentAccount.push(paymentAccount);
  }
  public removePaymentAccount(index:number){
    this.saleForm.paymentAccount.splice(index,1);
  }
  public increaseQuantity(productIndex:number,inventoryIndex:number){
    let quantity = this.saleCart.saleCartProduct[productIndex].saleCartInventory[inventoryIndex].inventorySaleForm.quantity;
    if(this.isNan(quantity)){
      quantity =1;
    }else{
      quantity++;
    }
    this.saleCart.saleCartProduct[productIndex].saleCartInventory[inventoryIndex].inventorySaleForm.quantity=quantity;
  }
  public decreaseQuantity(productIndex:number,inventoryIndex:number){
    let quantity = this.saleCart.saleCartProduct[productIndex].saleCartInventory[inventoryIndex].inventorySaleForm.quantity;
    if(quantity<=0)
      return;

    if(this.isNan(quantity)){
      quantity = 0;
    }else{
      quantity--;
    }

    this.saleCart.saleCartProduct[productIndex].saleCartInventory[inventoryIndex].inventorySaleForm.quantity=quantity;
  }
  public getTotalProductPrice(){
    let totalPrice = 0;
    for(const saleCartProduct of this.saleCart.saleCartProduct){
      for(const saleCartInventory of saleCartProduct.saleCartInventory) {
        const quantity = saleCartInventory.inventorySaleForm.quantity;
        const price = saleCartInventory.inventorySaleForm.sellingPrice;

        if(isNaN(quantity)||isNaN(price))continue;

        const total = quantity*price;
        totalPrice += total;

      }

    }
    return totalPrice;
  }

  public getTotalCost(){
    let totalCost =  this.getVat();
    return totalCost;
  }
  public getTotalAfterAddingCost(){
    return this.getTotalCost()+this.getTotalProductPrice();
  }
  public getDiscount(){
    const discount = this.saleForm.discount;
    return this.isNan(discount)?0:discount;
  }
  public getVat(){
    const vat =  this.saleForm.vat;
    return this.isNan(vat)?0:vat;
  }

  public getTotal(){
    const totalPrice = this.getTotalAfterAddingCost() - this.getDiscount();
    return totalPrice;
  }
  public isNan(value:number){
    if(typeof value === 'number' && !Number.isNaN(value))
      return false;
    return true;
  }
  public getTotalReceive(){
    let totalReceivedAmount = 0;
    for(const paymentAccount of this.saleForm.paymentAccount){
      if(isNaN(paymentAccount.amount))continue;
      totalReceivedAmount += paymentAccount.amount;
    }
    return totalReceivedAmount;
  }
  public getTotalDue(){
    return this.getTotal() - this.getTotalReceive();
  }
  public submitSell(){
    this.errors = [];
    this.saleForm.inventories = this.getInventorySaleFormCart();
    this.saleService.create(this.saleForm).subscribe((data)=>{
      this.router.navigate(['admin/sale/get-all/list']).then();
    },(error)=>{
      this.errors= error.error;
    });
  }
  private getInventorySaleFormCart(){
    const inventorySaleForms:InventorySaleForm[] = [];
    for(const saleCartProduct of  this.saleCart.saleCartProduct){
     for(const saleCartInventory  of   saleCartProduct.saleCartInventory){
       inventorySaleForms.push(saleCartInventory.inventorySaleForm);
      }
    }
    return inventorySaleForms;
  }

  public showConsumerModal(){
    (<any>$('#consumerForm')).modal({backdrop: 'static', keyboard: false});
  }
  public removeConsumerForm(){
    console.log(this.saleForm.consumerInfo);
    this.saleForm.consumerInfo = new ConsumerForm();
    this.saleForm.consumerInfo.personalInfo = new PersonalInfoForm();
  }
  public showProductModal(index){
    this.modalProductDetails = this.saleCart.saleCartProduct[index].product;

    (<any>$('#productDetailModal')).modal('show');
  }
}
