  import { Component, OnInit } from '@angular/core';
  import {FormBuilder, FormGroup, Validators} from '@angular/forms';
  import {CategoryService} from '../../../../services/category.service';
  import {Category} from '../../../../models/data/category';
  import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
  import {environment} from '../../../../../environments/environment';
  import {AuthService} from '../../../../services/auth.service';
  import {ProductService} from '../../../../services/product.service';
  import {ValidatorUtil} from '../../../../util/validator-util';
  import {Router} from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup;
  categories: Category[] = [];
  dropzoneConfig: DropzoneConfigInterface;
  apiUrl = environment.authApiUrl;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private authService: AuthService,
              private productService: ProductService,private router:Router) { }

  ngOnInit() {
    this.createFrom();
    this.getCategories();

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
    this.productAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: [''],
      weight: [''],
      weightUnit: ['KG'],
      imageToken: [''],
      barcode: ['']
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    );
  }

  addProduct(){
    console.log(this.productAddForm.value);
    this.productService.addProduct(this.productAddForm.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['admin/inventory/products']);
      },
      error => {
        ValidatorUtil.bindValidationError(error.error, this.productAddForm);
      }
    );
  }

  onUploadError(event) {
  }

  onUploadSuccess(event) {
    console.log(event[1]);
    this.productAddForm.controls.imageToken.setValue(event[1].token);
  }

  onUploadComplete(event, dz) {
    console.log('completed');
    console.log(event);
  }

}
