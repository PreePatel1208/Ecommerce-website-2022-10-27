import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { ToasterService } from 'src/app/services/toaster.service';

interface Props {
  id: number,
  image: string,
  description: string,
  name: string,
  mainImage: string,
  price: Float32Array,
  category: any
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  premiumData: any[] = [];
  categories: any[] = [];
  paginateData: any[] = [];
  page = 0;
  pageSize = 3;
  collectionSize = 0;
  isValid = true
  singlePost: any = []
  button = "Add Product"
  posts = <Props[]>[]
  updatedId: number = 0
  file: File | any
  signupForm: FormGroup | any;
  colors: FormGroup | any;
  sizes: FormGroup | any;
  modalReference:any
  constructor(private fb: FormBuilder,
    private product: ProductService,
    config: NgbModalConfig,
    private modalService: NgbModal,
   
    public toaster: ToasterService
  ) {
    this.getProductData();
    config.backdrop = 'static';
    config.keyboard = false;

  }
  ngOnInit() {

    this.getProductData();
    this.getPremiumData()
    this.getCategory();
    this.initializeForm();
  }
  ngOnChange() {

  }
  showStandard() {
    this.toaster.show('I am a standard toast');
  }

  showSuccess(msg: any) {
    this.toaster.show(msg, { classname: 'success-toaster text-light', delay: 3000 });
  }

  showDanger(dangerTpl: any) {
    this.toaster.show(dangerTpl, { classname: 'bg-danger text-light', delay: 3000 });
  }

  ngOnDestroy(): void {
    this.toaster.clear();
  }
  handlefilechange(event: any) {
    this.file = event.target.files[0];
  }
  open(content: any, id: number = 0) {
    if (id) {
      this.product.getdata(id).subscribe((data: any) => {

        this.updatedId = id
        const product = data.product
        this.button = "Update"
        this.signupForm.controls['name'].setValue(product.name);
        this.signupForm.controls['price'].setValue(product.price);
        this.signupForm.controls['description'].setValue(product.description);
        this.signupForm.controls['category'].setValue(product.category);
        this.signupForm.controls['isOutOfStock'].setValue(product.isOutOfStock ? "true" : "false");
        this.signupForm.controls['sold'].setValue(product.sold);
        this.signupForm.controls['quantity'].setValue(product.quantity);
        this.signupForm.controls['priceDiscount'].setValue(product.priceDiscount);
        // this.getProductData();  
      })
    } else {
      // this.signupForm.reset();
      this.button = "Add Product"
    }
    this.modalReference=this.modalService.open(content);
    
  }
  getProductData() {
    this.product.getProduct().subscribe((data: any) => {
      this.posts = data.products;
      console.log(this.posts);
      this.collectionSize = data.length
      // this.signupForm.reset();
    })
  }
  getCategory() {
    this.product.getCategory().subscribe((data: any) => {
      this.categories = data.categories;
    })
  }

  initializeForm() {
    this.colors = this.fb.group({
      'Red': false,
      'Green': false,
      'Blue': false,
    }),
      this.sizes = this.fb.group({
        'L': false,
        'M': false,
        'S': false,
      }),
      this.signupForm = this.fb.group({
        'priceDiscount': new FormControl('78',
          Validators.required,
        ),
        'price': new FormControl('',
          Validators.required),
        'description': new FormControl('',
          Validators.required),
        'image': new FormControl('',
          Validators.required),
        'category': new FormControl('',
          Validators.required),
        'quantity': new FormControl('',
          Validators.required),
        'name': new FormControl('',
          Validators.required),
        'colors': this.colors,
        'sizes': this.sizes,
        'sold': new FormControl('',
          Validators.required),
        'isOutOfStock': new FormControl('',
          Validators.required)
      });
  }
  get formAltaControls(): any {
    return this.signupForm['controls'];
  }
  addpost() {
  
    const data = this.signupForm.value
    let colors = [];
    let sizes = []
    for (var key in data.sizes) {
      if (data.sizes[key]) {
        sizes.push(key);
      }
    }
    for (var key in data.colors) {
      if (data.colors[key]) {
        colors.push(key);
      }
    }
    const colors_value = colors.join(',')
    const size_value = sizes.join(',')
    const formdata = new FormData();
    formdata.append('images', this.file);
    formdata.append('mainImage', this.file);
    formdata.append('price', data.price);
    formdata.append('priceDiscount', data.priceDiscount);
    formdata.append('quantity', data.quantity);
    formdata.append('name', data.name);
    formdata.append('colors', colors_value);
    formdata.append('sizes', size_value);
    formdata.append('sold', data.sold);
    formdata.append('isOutOfStock', data.isOutOfStock);
    formdata.append('description', data.description);
    formdata.append('category', data.category);
    if (this.button === "Update") {
      data.colors = colors_value
      data.sizes = size_value
      console.log(size_value);
      console.log(this.updatedId);;
      this.product.updatepost(this.updatedId, data).subscribe((data: any) => {
        this.showSuccess("Product updated succesfully")
      })
      this.modalReference.close()
      this.getProductData();
    } else {

      this.product.addpost(formdata).subscribe((data: any) => {

        this.showSuccess("Product Added succesfully")

      })
      this.getProductData();
    }
  }

  delete(id: number) {
    this.product.deletepost(id).subscribe((data: any) => {
      this.getProductData();
      this.showSuccess("Product Deleted succesfully")
    })
  }

  getPremiumData() {
    this.paginateData = this.posts
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


}
