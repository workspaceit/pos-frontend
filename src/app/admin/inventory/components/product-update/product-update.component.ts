import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../services/category.service';
import {Category} from '../../../../models/data/category';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '../../../../../environments/environment';
import {AuthService} from '../../../../services/auth.service';
import {ProductService} from '../../../../services/product.service';
import {ValidatorUtil} from '../../../../util/validator-util';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../../models/data/product';
import {GrowlUtil} from '../../../../util/growl-util';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
  providers: [CategoryService,ProductService]
})
export class ProductUpdateComponent implements OnInit {

  productUpdateForm: FormGroup;
  categories: Category[] = [];
  dropzoneConfig: DropzoneConfigInterface;
  apiUrl = environment.authApiUrl;

  productId: number;
  product: Product = new Product();


  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private authService: AuthService,
              private productService: ProductService,private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createFrom();
    this.getCategories();

    this.activatedRoute.params.subscribe(
      params => {
        this.productId = params['productId'];
        console.log(this.productId);
        this.getProduct();

      }
    );

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
  createFrom() {
    this.productUpdateForm = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      categoryId: [this.product.category.id],
      weight: [this.product.weight],
      weightUnit: [this.product.weightUnit],
      imageToken: [this.product.image],
      barcode: [this.product.barcode]
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    );
  }

  getProduct(){
    const thisComponent = this;
    this.productService.getProductById(this.productId).subscribe(
      product => {
        this.product = product;
        console.log(this.product);
        this.createFrom();
        console.log(this.productUpdateForm);
      },
      error => {

      }
    );
  }

  updateProduct(){
    console.log(this.productUpdateForm.value);
    this.productService.updateProduct(this.productUpdateForm.value, this.productId).subscribe(
      data => {
        GrowlUtil.notifyAndNavigate({type:'notice', title: 'Success', message: 'Product updated'}, '/admin/inventory/products',
          this.router);
      },error => { ValidatorUtil.bindValidationError(error.error, this.productUpdateForm); }
    );
  }

  onUploadError(event) {
  }

  onUploadSuccess(event) {
    console.log(event[1]);
    this.productUpdateForm.controls.imageToken.setValue(event[1].token);
  }

  onUploadComplete(event, dz) {
    console.log('completed');
    console.log(event);
  }

}
