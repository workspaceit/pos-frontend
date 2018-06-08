import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/data/product';
import {ProductAutoCompleteCommunicator} from '../../../../communicator/product-auto-complete-communicator';
import {InventoryService} from '../../../../services/inventory-service';
import {environment} from '../../../../../environments/environment';
import {InventoryCreateForm} from '../../../../models/form/inventory-create-form';
import {Cart} from '../../../../models/data/cart';
import {LedgerService} from '../../../../services/ledger-service';
import {Ledger} from '../../../../models/data/accounting/ledger';
import {PurchasePaymentCreateForm} from '../../../../models/form/purchase-payment-create-form';
import {PurchaseCreateForm} from '../../../../models/form/purchase-create-form';
import {ShipmentCreateForm} from '../../../../models/form/shipment-create-form';
import {CartDetails} from '../../../../models/data/cart-details';
import {ShipmentService} from '../../../../services/shipment.service';
import {Supplier} from '../../../../models/data/supplier';
import {SupplierService} from '../../../../services/supplier.service';
import {SHIPMENT_COST} from '../../../../models/constant/SHIPMENT_COST';
import {PRODUCT_CONDITION} from '../../../../models/constant/PRODUCT_CONDITION';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css'],
  providers: [ProductService,
              InventoryService,
              LedgerService,
              SupplierService,
              ShipmentService,
              ProductAutoCompleteCommunicator]
})
export class ProductPurchaseComponent implements OnInit {

  cart: Cart;
  modalProductDetails: Product;
  imgUrl= environment.imgUrl;
  paymentLedger: Ledger[];
  purchaseCreateForm: PurchaseCreateForm;
  suppliers: Supplier[];
  _SHIPMENT_COST = SHIPMENT_COST;

  constructor(private productService:ProductService,
              private inventoryService: InventoryService,
              private ledgerService: LedgerService,
              private shipmentService:ShipmentService,
              private supplierService:SupplierService,
              private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator) {
    this.purchaseCreateForm = new PurchaseCreateForm();
    this.modalProductDetails = new Product();
    this.cart=new Cart();

    this.purchaseCreateForm.inventories=[];
    this.purchaseCreateForm.shipment = new ShipmentCreateForm();

    this.purchaseCreateForm.productPricePaymentAccount =[];
    this.cart.cartDetails = [];

    const productPricePaymentAccount = new PurchasePaymentCreateForm();
    productPricePaymentAccount.ledgerId=0;
    productPricePaymentAccount.amount =0;

    const shippingCostPaymentAccount = new PurchasePaymentCreateForm();
    shippingCostPaymentAccount.ledgerId=0;
    shippingCostPaymentAccount.amount =0;

    this.purchaseCreateForm.productPricePaymentAccount.push(productPricePaymentAccount);
    this.purchaseCreateForm.shippingCostPaymentAccount = shippingCostPaymentAccount;

    this.purchaseCreateForm.shipment.supplierId = 0;
    this.purchaseCreateForm.shipment.cost = new Map<SHIPMENT_COST, string>();
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.CF] = 0;
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.CARRYING] = 0;
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.LABOR] = 0;
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.CF] = 0;
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.CF] = 0;



    productAutoCompleteCommunicator.onProductSelect.subscribe((data)=>{
      const alreadyExistingProduct = this.cart.cartDetails.find(value => value.product.name === data.name);



      if(alreadyExistingProduct === undefined || alreadyExistingProduct ===null){
        const inventoryCreateForm: InventoryCreateForm = new InventoryCreateForm();
        inventoryCreateForm.productId = data.id;
        inventoryCreateForm.purchasePrice = 0;
        inventoryCreateForm.sellingPrice = 0;
        inventoryCreateForm.purchaseQuantity=0;
        inventoryCreateForm.status =PRODUCT_CONDITION.GOOD;

        const cartDetails =  new CartDetails();
        cartDetails.product = data;
        cartDetails.inventoryForm = inventoryCreateForm;

        this.cart.cartDetails.push(cartDetails);
      }

    });
  }

  ngOnInit() {
    const componentReff = this;
    (<any>$('#purchaseDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
      componentReff.purchaseCreateForm.shipment.purchaseDate = (<any>$)(this).val();
    });


    /**
     * API to fetch necessary data
     * */
    this.getLedger();
    this.getSuppliers();
  }
  public removeProductFromCart(index:number){
    this.cart.cartDetails.splice(index,1);
  }
  public showProductModal(index){
    console.log(this.cart);
    this.modalProductDetails = this.cart.cartDetails[index].product;
    console.log(' this.products',this.modalProductDetails);
    (<any>$('#productDetailModal')).modal('show');
  }
  public increaseQuantity(index){
    this.cart.cartDetails[index].inventoryForm.purchaseQuantity++;
  }
  public decreaseQuantity(index){
    if(this.cart.cartDetails[index].inventoryForm.purchaseQuantity>0){

      this.cart.cartDetails[index].inventoryForm.purchaseQuantity--;
    }
  }
  public getLedger(){
    this.ledgerService.getBankOrCashAccount().subscribe((data)=>{
      this.paymentLedger = data;
    });
  }
  public getSuppliers(){
    this.supplierService.getSuppliers().subscribe((data)=>{
        this.suppliers = data;
    });
  }
  public addProductPricePaymentAccount(){
    const purchasePaymentCreateForm = new PurchasePaymentCreateForm();
    purchasePaymentCreateForm.amount = 0;
    purchasePaymentCreateForm.ledgerId = 0;

    this.purchaseCreateForm.productPricePaymentAccount.push(purchasePaymentCreateForm);
  }
  public getTotalPaid(){
    let totalPaid = 0;
    console.log("getTotalPaid");
    for(const productPricePaymentAccount of this.purchaseCreateForm.productPricePaymentAccount){
      totalPaid += productPricePaymentAccount.amount;
    }
    totalPaid += this.purchaseCreateForm.shippingCostPaymentAccount.amount;

    return totalPaid;
  }
  public getTotalPrice(){
      let totalPrice = 0;
      console.log("getTotalPrice");
      for(const cartDetails of this.cart.cartDetails){

        totalPrice += cartDetails.inventoryForm.purchasePrice*cartDetails.inventoryForm.purchaseQuantity;
      }
      return totalPrice;
  }
  public getDue(){
    const totalPaid = this.getTotalPaid();
    const totalPrice = this.getTotalPrice();

    return totalPrice - totalPaid;
  }
  public getInventories(){
    const inventories:InventoryCreateForm[] = [];
    for(let cartDetails of this.cart.cartDetails){
      inventories.push(cartDetails.inventoryForm);
    }
    return inventories;
  }
  public submitPurchase(){
    this.purchaseCreateForm.inventories  = this.getInventories();
    this.shipmentService.create(this.purchaseCreateForm);
  }
}
