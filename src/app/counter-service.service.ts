import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { ProductService } from './services/product.service';


@Injectable({
    providedIn: 'root'
})
export class CounterServiceService {
    counter: any = []
    cart: number = 0
    wishlist: number = 0
    total: number = 0


    private messageSource = new BehaviorSubject(this.cart);
    private messageSource1 = new BehaviorSubject(this.wishlist);
    private messageSource2 = new BehaviorSubject(this.total);

    currentMessage = this.messageSource.asObservable();
    currentMessage1 = this.messageSource1.asObservable();
    currentMessage2 = this.messageSource2.asObservable();

    constructor(private Product: ProductService) {
        this.getCartDetail()
        this.getWishlistDetail()
        this.getTotal()
    }
    getCartDetail(){
        this.Product.getCart().subscribe((data: any) => {
            this.cart = data.cart.items.length;
            this.messageSource.next(this.cart)
        })
    }

    getWishlistDetail(){
        this.Product.getWishlist().subscribe((data: any) => {
           this.wishlist=data.favorite.products.length
            this.messageSource1.next(this.wishlist)
        })
    }
    getTotal(){
        this.Product.getCart().subscribe((data: any) => {
            console.log(data.cart.items);
            data.cart.items.forEach((item:any)=>{
                this.total+= item.product.price*item.totalProductQuantity;
            });            
            this.messageSource2.next(this.total)
        })
    }

    changeMessage(message: number) {
        this.messageSource.next(message)
    }
    changeMessage1(message: number) {
        this.messageSource1.next(message)
    }
    changeMessage2(message: number) {
        this.messageSource2.next(message)
    }
}
