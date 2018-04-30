import { Component, OnInit } from '@angular/core';
import {GrowlUtil} from '../../../../util/growl-util';
import {ValidatorUtil} from '../../../../util/validator-util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WholesalerService} from '../../../../services/wholesaler.service';

@Component({
  selector: 'app-wholesaler-add',
  templateUrl: './wholesaler-add.component.html',
  styleUrls: ['./wholesaler-add.component.css'],
  providers: [WholesalerService]
})
export class WholesalerAddComponent implements OnInit {

  wholesalerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private wholesalerService: WholesalerService) {

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.wholesalerForm = this.formBuilder.group({
      'wholesalerId': [''],

      'company.title': ['', Validators.required],
      'company.address': [''],
      'company.phone': [''],
      'company.email': ['']
    });
  }

  createWholesaler(){
    console.log(this.wholesalerForm.value);
    this.wholesalerService.createWholesaler(this.wholesalerForm.value).subscribe(
      wholesaler => {
        GrowlUtil.notify({type:'notice', title: 'Success', message: 'Wholesaler created'});
      }, error => {
        ValidatorUtil.bindValidationError(error.error, this.wholesalerForm);
      }
    );
  }

}
