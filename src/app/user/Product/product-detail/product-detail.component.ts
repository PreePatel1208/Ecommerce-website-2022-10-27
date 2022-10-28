import { Component, OnInit } from '@angular/core';
import {Router,NavigationExtras} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

interface Props {
  id: number,
  image: string,
  description: string,
  name: string,
  mainImage: string,
  price:Float32Array,
  category:any
} 

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
product_id:any
single_post:any = []
  constructor(private route: ActivatedRoute,
    private product: ProductService
    
    ) {
      
this.product_id=this.route.snapshot.paramMap.get('product_id')
this.getSingleProductDetail()
   }

  ngOnInit(): void {
this.getSingleProductDetail()

  }
  ngOnChanges(){

  }
  getSingleProductDetail(){
this.product.getSigleProduct(this.product_id).subscribe((data: any) => {
console.log("single_data",data);
this.single_post=data.product
  // this.signupForm.reset();
})
}
  

}
