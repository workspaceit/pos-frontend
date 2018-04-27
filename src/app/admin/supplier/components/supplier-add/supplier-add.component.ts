import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier.service';
import {GrowlUtil} from '../../../../util/growl-util';
import {ValidatorUtil} from '../../../../util/validator-util';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css'],
  providers: [SupplierService]
})
export class SupplierAddComponent implements OnInit {

  supplierForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.supplierForm = this.formBuilder.group({
      'supplierId': [''],

      'company.title': ['', Validators.required],
      'company.address': [''],
      'company.phone': [''],
      'company.email': ['']
    });
  }

  createSupplier(){
    console.log(this.supplierForm.value);
    this.supplierService.createSupplier(this.supplierForm.value).subscribe(
      suuplier => {
        GrowlUtil.notify('notice', 'Success', 'Supplier Created');
      }, error => {
        ValidatorUtil.bindValidationError(error.error, this.supplierForm);
      }
    );
  }

}
