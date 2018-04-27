import { Component, OnInit } from '@angular/core';
import {Supplier} from '../../../../models/data/supplier';
import {SupplierService} from '../../../../services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  providers: [SupplierService]
})
export class SupplierListComponent implements OnInit {

  suppliers: Supplier[];

  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    this.getSuppliers();
  }

  getSuppliers(){
    this.supplierService.getSuppliers().subscribe(
      data => {
        this.suppliers = data;
      }
    );
  }

}
