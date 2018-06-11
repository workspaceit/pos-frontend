import { Component, OnInit } from '@angular/core';
import {LedgerService} from '../../../../services/ledger-service';
import {Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {InventoryService} from '../../../../services/inventory-service';
import {SupplierService} from '../../../../services/supplier.service';
import {ProductAutoCompleteCommunicator} from '../../../../communicator/product-auto-complete-communicator';
import {Ledger} from '../../../../models/data/accounting/ledger';
import {Supplier} from '../../../../models/data/supplier';
import {Inventory} from '../../../../models/data/Inventory';

@Component({
  selector: 'app-sell-to-wholesaler',
  templateUrl: './sell-to-wholesaler.component.html',
  styleUrls: ['./sell-to-wholesaler.component.css'],
  providers: [ProductService,
    InventoryService,
    LedgerService,
    SupplierService,
    ProductAutoCompleteCommunicator]
})
export class SellToWholesalerComponent implements OnInit {
  private  paymentLedgers:Ledger[];
  private  suppliers:Supplier[];
  private inventories:Inventory[];
  constructor(private productService:ProductService,
              private inventoryService: InventoryService,
              private ledgerService: LedgerService,
              private supplierService:SupplierService,
              private productAutoCompleteCommunicator: ProductAutoCompleteCommunicator,
              private router: Router) {
    this.inventories = [];
    productAutoCompleteCommunicator.onProductSelect.subscribe((data)=>{

       this.inventoryService.getByProductId(data.id).subscribe((data)=>{
         if(data.length==0){
           console.log('0 Inventory');
         }
         this.inventories = this.inventories.concat(data);
         console.log('Inventory ',this.inventories,data);
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
    this.getSuppliers();
  }
  public getLedger(){
    this.ledgerService.getBankOrCashAccount().subscribe((data)=>{
      this.paymentLedgers = data;
    });
  }
  public getSuppliers(){
    this.supplierService.getSuppliers().subscribe((data)=>{
      this.suppliers = data;
      console.log('this.suppliers',this.suppliers);
    });
  }
}
