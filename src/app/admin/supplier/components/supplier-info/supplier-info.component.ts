import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../../../../services/supplier.service';
import {ActivatedRoute} from '@angular/router';
import {Supplier} from '../../../../models/data/supplier';

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.css'],
  providers:[SupplierService]
})
export class SupplierInfoComponent implements OnInit {
  supplierId:number;
  supplier: Supplier = new Supplier();
  constructor(private activatedRoute: ActivatedRoute,private supplierService: SupplierService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.supplierId = params['id'];
        this.getSupplier();
      }
    );
  }
  private getSupplier(){
    this.supplierService.getSupplierById(this.supplierId).subscribe((data)=>{
      this.supplier = data;
    });
  }
}
