import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToasterService } from '../services/toaster.service';
import { CounterServiceService } from '../counter-service.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cart:any[]=[]

totalCheckoutPrice:number=0
  constructor(
    private Product:ProductService,
    private toaster:ToasterService,
    private totalcount:CounterServiceService,
  ) { }
//toaster methods
showStandard() {
  this.toaster.show('I am a standard toast');
}

showSuccess(msg: any) {
  this.toaster.show(msg, { classname: 'success-toaster text-light', delay: 3000 });
}

showDanger(dangerTpl: any) {
  this.toaster.show(dangerTpl, { classname: 'bg-danger text-light', delay: 3000 });
}


  decreseClick(id:string,color:string,size:string){
    const data={
      productId: id,
      selectedColor: color,
      selectedSize: size
    }
    console.log(data); 
    this.Product.decreaseQuantity(data).subscribe((data:any)=>{
      console.log(data);
      this.getCartDetail() 
    })
  }
 
  handlePlaceOrder(){
 const  data= {
      shippingAddress: {
        address: "bimpur",
        city: "surat",
        country: "India",
        postalCode: "458778"
      },
      paymentMethod: "credit",
      phone: "837937590",
      cardNumber: "4242424242424242",
      expMonth: 3,
      expYear: 2026,
      cvc: "456"
    }
    this.Product.placeOrder(data).subscribe((data:any)=>{
    this.cart=[]
    this.totalCheckoutPrice=0
  
    this.showSuccess("Order placed successlly")
    })
  }
  increseClick(id:string,color:string,size:string){
    const data={
      productId: id,
      selectedColor: color,
      selectedSize: size
    }
    console.log(data);
    
    this.Product.increaseQuantity(data).subscribe((data:any)=>{
      console.log(data);
      this.getCartDetail()
    })
  }
  ngOnInit(): void {
    this.getCartDetail()
    this.countTotalPrice()
    this.totalcount.currentMessage2.subscribe((totalCheckoutPrice: number) => {   
      this.totalCheckoutPrice = totalCheckoutPrice;
    })
   
  }

  getCartDetail(){
    let totalAmount=0
    this.Product.getCart().subscribe((data:any)=>{
      this.cart=data.cart.items 
      data.cart.items.forEach((item:any)=>{
        totalAmount+= item.product.price*item.totalProductQuantity;
    }); 
    this.totalcount.changeMessage2(totalAmount)
    this.totalcount.changeMessage(this.cart.length)
    })
  }
  removeCart(id:string,color:string,size:string){
    const data={
      selectedColor: color,
      selectedSize: size
    }
    this.Product.deleteItemCart(id,data).subscribe((data:any)=>{
      console.log(data);
      this.getCartDetail()
      this.showSuccess("Cart item removed successlly")
    })
  }

  countTotalPrice(){
    let map1:any
     map1 += this.cart.map(x => (x.product.price * x.totalProductQuantity));
     console.log(map1);
     

  }

}
