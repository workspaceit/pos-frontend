import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ShopService} from '../../../../services/shop.service';
import {ValidatorUtil} from '../../../../util/validator-util';
import {GrowlUtil} from '../../../../util/growl-util';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '../../../../../environments/environment';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {Shop} from '../../../../models/data/shop';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css'],
  providers: [ShopService]
})
export class ShopInfoComponent implements OnInit {

  shopInfoForm: FormGroup;
  dropzoneConfig: DropzoneConfigInterface;
  apiUrl = environment.authApiUrl;
  imgUrl = environment.imgUrl;
  shop: Shop = new Shop();

  constructor(private formBuilder: FormBuilder, private shopInfoService: ShopService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.createShopInfoForm();
    this.getShopInfo();
    this.dropzoneConfig = {
      url: this.apiUrl + '/api/upload/temp-file/product-image',
      maxFiles: 1,
      clickable: true,
      acceptedFiles: 'image/*',
      createImageThumbnails: true,
      // autoReset: 1,
      errorReset: 1,
      headers:{
        'Authorization': 'Bearer '+this.authService.getLocalOAuthCredential().access_token
      },
      previewsContainer: '#dropzone-preview'
    };
  }
  createShopInfoForm() {
    console.log(this.shop);
    this.shopInfoForm = this.formBuilder.group({
      'name': [this.shop.name],
      'address': [this.shop.address],
      'imageToken': [this.shop.imageToken],
      'email': [this.shop.email],
      'phone': [this.shop.phone],
      'logo': [this.shop.logo]
    });

    /*console.log(this.shopInfoForm.controls);*/
  }
  addShopInfo() {
    console.log(this.shopInfoForm.value);
    this.shopInfoService.createShopInfo(this.shopInfoForm.value).subscribe(
      shop => {
        GrowlUtil.notify({type:'notice', title: 'Success', message: 'Shop Info created'});
      },
      error => {
        console.log(error);
        ValidatorUtil.bindValidationError(error.error, this.shopInfoForm);
      }
    );
  }
  getShopInfo()
  {
    this.shopInfoService.getShopInfo().subscribe(
      shop => {
        this.shop = shop;
        this.createShopInfoForm();
      },
    );
  }

  onUploadError(event) {
  }

  onUploadSuccess(event) {
    console.log(event[1]);
    this.shopInfoForm.controls.imageToken.setValue(event[1].token);
  }

  onUploadComplete(event, dz) {
    console.log('completed');
    console.log(event);
  }

}
