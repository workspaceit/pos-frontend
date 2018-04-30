import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WholesalerService} from '../../../../services/wholesaler.service';
import {Wholesaler} from '../../../../models/data/wholesaler';
import {ActivatedRoute} from '@angular/router';
import {ValidatorUtil} from '../../../../util/validator-util';
import {GrowlUtil} from '../../../../util/growl-util';

@Component({
  selector: 'app-wholesaler-update',
  templateUrl: './wholesaler-update.component.html',
  styleUrls: ['./wholesaler-update.component.css'],
  providers: [WholesalerService]
})
export class WholesalerUpdateComponent implements OnInit {

  wholesalerId: number;
  wholesaler: Wholesaler = new Wholesaler();
  wholesalerForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder, private wholesalerService: WholesalerService) {

  }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.params.subscribe(
      params => {
        this.wholesalerId = params['wholesalerId'];
        this.getWholesaler();
      }
    );
  }

  createForm() {

    this.wholesalerForm = this.formBuilder.group({
      'wholesalerId': [this.wholesaler.wholesalerId],

      'company.title': [this.wholesaler.company.title, Validators.required],
      'company.address': [this.wholesaler.company.address.formattedAddress],
      'company.phone': [this.wholesaler.company.phone],
      'company.email': [this.wholesaler.company.email]
    });
  }

  getWholesaler() {
    this.wholesalerService.getWholesalerById(this.wholesalerId).subscribe(
      data => {
        console.log(data);
        this.wholesaler = data;
        this.createForm();
      }
    );
  }

  updateWholesaler(){
    this.wholesalerService.updateWholesaler(this.wholesalerForm.value, this.wholesalerId).subscribe(
      wholesaler => {
        this.wholesaler = wholesaler;
        GrowlUtil.notify({type:'notice', title: 'Success', message: 'Wholesaler updated'});
      },
      error => {
        ValidatorUtil.bindValidationError(error.error, this.wholesalerForm);
      }
    );
  }

}
