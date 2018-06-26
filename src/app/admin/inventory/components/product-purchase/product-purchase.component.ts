import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/data/product';
import {ProductAutoCompleteCommunicator} from '../../../../communicator/product-auto-complete-communicator';
import {InventoryService} from '../../../../services/inventory-service';
import {environment} from '../../../../../environments/environment';
import {InventoryCreateForm} from '../../../../models/form/inventory-create-form';
import {Cart} from '../../../../models/form/cart';
import {LedgerService} from '../../../../services/ledger-service';
import {Ledger} from '../../../../models/data/accounting/ledger';
import {PurchaseCreateForm} from '../../../../models/form/purchase-create-form';
import {ShipmentCreateForm} from '../../../../models/form/shipment-create-form';
import {CartDetails} from '../../../../models/form/cart-details';
import {ShipmentService} from '../../../../services/shipment.service';
import {Supplier} from '../../../../models/data/supplier';
import {SupplierService} from '../../../../services/supplier.service';
import {SHIPMENT_COST} from '../../../../models/constant/SHIPMENT_COST';
import {PRODUCT_CONDITION} from '../../../../models/constant/PRODUCT_CONDITION';
import {Router} from '@angular/router';
import {PaymentLedgerForm} from '../../../../models/form/payment-ledger-form';

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
  errors=[];
  constructor(private productService:ProductService,
              private inventoryService: InventoryService,
              private ledgerService: LedgerService,
              private shipmentService:ShipmentService,
              private supplierService:SupplierService,
              private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator,
              private router: Router) {
    this.purchaseCreateForm = new PurchaseCreateForm();
    this.modalProductDetails = new Product();
    this.cart= new Cart();

    this.purchaseCreateForm.inventories=[];
    this.purchaseCreateForm.shipment = new ShipmentCreateForm();

    this.purchaseCreateForm.productPricePaymentAccount =[];
    this.cart.cartDetails = [];

    const productPricePaymentAccount = new PaymentLedgerForm();
    productPricePaymentAccount.ledgerId=0;
    productPricePaymentAccount.amount =null;

    const shippingCostPaymentAccount = new PaymentLedgerForm();
    shippingCostPaymentAccount.ledgerId=0;
    shippingCostPaymentAccount.amount =null;

    this.purchaseCreateForm.productPricePaymentAccount.push(productPricePaymentAccount);
    this.purchaseCreateForm.shippingCostPaymentAccount = shippingCostPaymentAccount;

    this.purchaseCreateForm.shipment = new ShipmentCreateForm();
    this.purchaseCreateForm.shipment.supplierId = 0;
    this.purchaseCreateForm.shipment.cost = {};

    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.CF.toString()] = 0;
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.CARRYING.toString()] = null;
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.LABOR.toString()] = null;
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.CF.toString()] = null;
    this.purchaseCreateForm.shipment.cost[SHIPMENT_COST.CF.toString()] = null;


    productAutoCompleteCommunicator.onProductSelect.subscribe((data)=>{

      /*const alreadyExistingProduct = this.cart.cartDetails.find(value => value.product.name === data.name);
      if(alreadyExistingProduct !== undefined && alreadyExistingProduct !==null){
        return;
      }*/

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


    });
  }

  ngOnInit() {
    const componentRef = this;
    (<any>$('#purchaseDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
      componentRef.purchaseCreateForm.shipment.purchaseDate = (<any>$)(this).val();
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
        console.log('this.suppliers',this.suppliers);
    });
  }
  public addProductPricePaymentAccount(){
    const purchasePaymentCreateForm = new PaymentLedgerForm();
    purchasePaymentCreateForm.ledgerId = 0;
    purchasePaymentCreateForm.amount = null;

    this.purchaseCreateForm.productPricePaymentAccount.push(purchasePaymentCreateForm);
  }
  public removeProductPricePaymentAccount(index:number){
    this.purchaseCreateForm.productPricePaymentAccount.splice(index,1);
  }
  public getTotalPaid(){
    let totalPaid = 0;
    for(const productPricePaymentAccount of this.purchaseCreateForm.productPricePaymentAccount){
      totalPaid += productPricePaymentAccount.amount;
    }
    totalPaid += this.purchaseCreateForm.shippingCostPaymentAccount.amount;

    return totalPaid;
  }
  public getTotalPrice(){
      let totalPrice = 0;
      for(const cartDetails of this.cart.cartDetails){

        totalPrice += cartDetails.inventoryForm.purchasePrice*cartDetails.inventoryForm.purchaseQuantity;
      }
      return totalPrice+ this.getTotalCost();
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
    this.shipmentService.create(this.purchaseCreateForm).subscribe((data)=>{
      console.log("data",data);
      this.router.navigate(['admin/purchase/shipments/list']).then();
    },error=>{
      console.log("error",error);
      this.errors = error.error;
    });
  }
  public getTotalCost(){
    let totalCost=0;

    for(const key in this.purchaseCreateForm.shipment.cost){
      totalCost += this.purchaseCreateForm.shipment.cost[key];
    }
    return totalCost;
  }

}
