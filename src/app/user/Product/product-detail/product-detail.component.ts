import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CounterServiceService } from 'src/app/counter-service.service';
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
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product_id: any
  single_post: any = []
  cart: any = []
  isItemIncart:boolean=false
  constructor(private route: ActivatedRoute,
    private product: ProductService,
    private toaster: ToasterService,
    private data: CounterServiceService,
    private totalcount:CounterServiceService,
    private router: Router,

  ) {

    this.product_id = this.route.snapshot.paramMap.get('product_id')
    this.getSingleProductDetail()
    this.isInCart(this.product_id)
    console.log(this.isItemIncart);
    
  }
  showSuccess(msg: any) {
    this.toaster.show(msg, { classname: 'success-toaster text-light', delay: 3000 });
  }
  ngOnInit(): void {
    this.getSingleProductDetail()

  }
  ngOnChanges() {

  }
  isInCart(id:any){
    this.getCartDetail(id) 
  }
  getCartDetail(id:any){
    let totalAmount=0
    this.product.getCart().subscribe((data:any)=>{
      this.cart=data.cart.items 
      data.cart.items.filter((item:any)=>{
       if( item.product._id==id){
        this.isItemIncart=true 
       }
      
    }); 
    this.totalcount.changeMessage2(totalAmount)
    this.totalcount.changeMessage(this.cart.length)
    })
   

  }
  handleViewCart() {
    this.router.navigate(['/cart-detail']);
  }
  handleAddToCartClick(id: any) {
    console.log(this.single_post);
    const data = {
      productId: id,
      quantity: 1,
      selectedColor: "63492b354542210d8ae4fff3",
      selectedSize: "6347eb5d84e80f4770a11df2"
    }
    this.product.addToCart(data).subscribe((data: any) => {
      this.showSuccess("Item added to cart successfully")
      this.data.changeMessage(data.cart.items.length)
    })
  }

  decreseClick(id:number,color:string,size:string){
    const data={
      productId: id,
      selectedColor: color,
      selectedSize: size
    }
    this.product.decreaseQuantity(data).subscribe((data:any)=>{
      this.cart=data.cart 
    })
  }
  increseClick(id:number,color:string,size:string){
    const data={
      productId: id,
      selectedColor: color,
      selectedSize: size
    }
    console.log(data);
    this.product.increaseQuantity(data).subscribe((data:any)=>{
      console.log(data);
      this.cart=data.cart
    })
  }

  getSingleProductDetail() {
    this.product.getSigleProduct(this.product_id).subscribe((data: any) => {
      console.log("single_data", data);
      this.single_post = data.product
      // this.signupForm.reset();
    })
  }


}
