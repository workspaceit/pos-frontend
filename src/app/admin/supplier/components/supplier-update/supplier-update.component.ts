import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier.service';
import {Supplier} from '../../../../models/data/supplier';
import {ActivatedRoute} from '@angular/router';
import {ValidatorUtil} from '../../../../util/validator-util';
import {GrowlUtil} from '../../../../util/growl-util';

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.css'],
  providers: [SupplierService]
})
export class SupplierUpdateComponent implements OnInit {

  protected supplierForm: FormGroup;
  protected supplierId: number;
  protected supplier: Supplier = new Supplier();

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private supplierService: SupplierService) { }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.params.subscribe(
      params => {
        this.supplierId = params['supplierId'];
        this.getSupplier();
      }
    );

  }

  createForm() {
    const formData = {
      'company.title': [this.supplier.company.title, Validators.required],
      'company.address': [this.supplier.company.address.formattedAddress],
      'company.phone': [this.supplier.company.phone],
      'company.email': [this.supplier.company.email]
    };
    formData['supplierId']= (this.supplier.supplierId!=null)?[this.supplier.supplierId]:[''];
    this.supplierForm = this.formBuilder.group(formData);
    console.log(formData);
  }

  getSupplier() {
    this.supplierService.getSupplierById(this.supplierId).subscribe(
      supplier => {
          this.supplier = supplier;
          this.createForm();
          // console.log(this.supplier);
        },
        error => {
        }
    );
  }

  updateSupplier(){
    this.supplierService.updateSupplier(this.supplierForm.value, this.supplierId).subscribe(
      supplier => {
        this.supplier = supplier;
        GrowlUtil.notify({type:'notice', title: 'Success', message: 'Supplier updated'});
      }, error => {
        ValidatorUtil.bindValidationError(error.error, this.supplierForm);
      }
    );
  }

}
