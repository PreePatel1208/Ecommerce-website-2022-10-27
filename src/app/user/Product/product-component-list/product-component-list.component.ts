import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';
import { CounterServiceService } from 'src/app/counter-service.service';

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
  selector: 'app-product-component-list',
  templateUrl: './product-component-list.component.html',
  styleUrls: ['./product-component-list.component.scss']
})
export class ProductComponentListComponent implements OnInit {

  @Input()
  isWishlist: boolean | any;

  posts = <Props[]>[]
  cart:any[]=[]
  isItemIncart=0
  page = 0;
  pageSize = 3;
  collectionSize = 0;
  isValid = true
  totalcount=0
  constructor(private router: Router,
    private product: ProductService,
    private toaster: ToasterService,
    private data: CounterServiceService

  ) { }
  //toaster mehods
  showStandard() {
    this.toaster.show('I am a standard toast');
  }

  showSuccess(msg: any) {
    this.toaster.show(msg, { classname: 'success-toaster text-light', delay: 3000 });
  }

  showDanger(dangerTpl: any) {
    this.toaster.show(dangerTpl, { classname: 'bg-danger text-light', delay: 3000 });
  }
  //
  ngOnInit(): void {
    this.getCartDetail()
    if (this.isWishlist)
      this.getWishlistProduct()
    else
      this.getProductData()
  }

  handleViewClick(id: any) {
    this.router.navigate(['/single-detail', { "product_id": id }]);
  }
  handleViewCart(){
    this.router.navigate(['/cart-detail']);
  }
  
  handleAddToCartClick(id: any) {
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
  getProductData() {
    this.product.getProduct().subscribe((data: any) => {
      this.posts = data.products;
      console.log(this.posts);
      this.collectionSize = data.length
      // this.signupForm.reset();
    })
  }
  getCartDetail(){
    let totalAmount=0
    this.product.getCart().subscribe((data:any)=>{
      this.cart=data.cart.items 
      data.cart.items.forEach((item:any)=>{
        totalAmount+= item.product.price*item.totalProductQuantity;
    }); 

    this.data.changeMessage2(totalAmount)
    })
  }
isIncart(id:any){
 
this.isItemIncart=0
  this.cart.forEach((element) => {
    console.log("id",element.product.id);
    
      if (element.product.id ==id) {
        console.log("matched");
        
        this.isItemIncart=1
      }
    });
}
decreseClick(id:number,color:string,size:string){
  const data={
    productId: id,
    selectedColor: color,
    selectedSize: size
  }
  console.log(data);
  
  this.product.decreaseQuantity(data).subscribe((data:any)=>{
    console.log(data);
    this.getCartDetail()
   
    this.getProductData()
    
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
    this.getCartDetail()
    this.getProductData()
  })
}
  getWishlistProduct() {
    this.product.getWishlist().subscribe((data: any) => {
      console.log(data.favorite.products);
      this.posts = data.favorite.products;
      this.data.changeMessage1(data.favorite.products.length)
    })
  }
  removeItemWishlist(id: any) {
    this.product.removeWhishlist(id).subscribe((data: any) => {
      this.showSuccess("Item Remove to Wishlist successfully")
      this.getWishlistProduct()
    })
  }

  handleAddToWishlist(id: any) {
    const data = {
      productId: id
    }
    this.product.addWhishlist(data).subscribe((data: any) => {
      this.showSuccess("Item added to Wishlist successfully")
      this.getWishlistProduct()
      this.getProductData()
    })
  }

}
