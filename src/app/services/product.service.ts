import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JWTDecodeService } from '../jwt-decode.service';
const url = "https://ppanarola.myshopify.com/admin/api/2022-10/products.json/"
interface Props {
  id: number,
  author: string,
  descrition: string,
  title: string
}
interface HeaderDict {
  token: string;
  contentType?: string;
}
const headerDict = (arg: HeaderDict = { token: '', contentType: 'application/json' }) => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ...(arg.contentType && { 'Content-Type': arg.contentType }),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Accept: 'application/json',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Access-Control-Allow-Headers': 'Content-Type',
  "X-Shopify-Access-Token": `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`
});


@Injectable({
  providedIn: 'root'
})
export class ProductService {
token:any=""
header:any={}
  constructor(private http: HttpClient,
     private router: Router,
     private jwt: JWTDecodeService,
     ) { }
    // token=this.jwt.getToken() 
    //   header = {
    //   headers: new HttpHeaders({
    //     // accept:application/json",
    //     Authorization:"bearer "+this.token}),
    // }
    
  requestOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": '*',
      'Content-Type': 'application/json',
      "X-Shopify-Access-Token": "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"
    }),
  };

  setHeaders(checked_auth:boolean = true){
  this.token=this.jwt.getToken() 
  if(this.token){
    this.header = {
      headers: new HttpHeaders({
        // accept:application/json",
        Authorization:"bearer "+this.token}),
    }
  }else{
    if (checked_auth) {
      this.router.navigate(['login']);  
    }
  }
   
  }

  placeOrder(data:any){
    this.setHeaders(true)
    return this.http.post("http://localhost:9500/api/order", data,
    this.header
  );
  }
  getProduct() {
    return this.http.get("http://localhost:9500/api/product");
  }
getOrders(){
  this.setHeaders(false)
  return this.http.get("http://localhost:9500/api/order",
  this.header
);
}
  getCategory() {
    return this.http.get("http://localhost:9500/api/category");
  }
  addpost(data: any) {
    this.setHeaders(true)
    return this.http.post("http://localhost:9500/api/product",
      data,
      this.header
    );
  }
  deletepost(id: number) {
    this.setHeaders(true)
    return this.http.delete("http://localhost:9500/api/product/" + id,
      this.header
    );
  }
  
  addToCart(data: any) {
    this.setHeaders(true)
    return this.http.post("http://localhost:9500/api/cart", data,
      this.header
    );
  }
  getCart() {
    // this.setHeaders(true)
    this.setHeaders(false)

    return this.http.get("http://localhost:9500/api/cart",
      this.header
    );
  }
  removeWhishlist(id:any){
    return this.http.delete("http://localhost:9500/api/favorite/"+id,
      this.header
    );
  }
  addWhishlist(data:any){
    this.setHeaders(true)
    return this.http.post("http://localhost:9500/api/favorite",
    data,
    this.header
  );
  }
  updatepost(id: number, data: any) {
    this.setHeaders(true)
    this.http.patch("http://localhost:9500/api/product/" + id + "/details",
      {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        sold: data.sold,
        colors: data.colors,
        sizes: data.sizes,
        isOutOfStock: data.isOutOfStock
      },
      this.header
    );
    this.http.post("http://localhost:9500/api/product/color/" + id,
      {
        color: data.colors
      },
      this.header
    );
    return this.http.post("http://localhost:9500/api/product/size/" + id,
      {
        color: data.sizes
      },
      this.header
    );
  }
  getdata(id: Number) {
    return this.http.get("http://localhost:9500/api/product/" + id);
  }
  getWishlist(){
  this.setHeaders(false)

    // this.setHeaders(true)
    return this.http.get("http://localhost:9500/api/favorite",
    this.header
  );
  }
  deleteItemCart(id: any, data: any) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "bearer "+ this.token  }), body: data
  }
    return this.http.delete("http://localhost:9500/api/cart/" + id, httpOptions
    );
   
  }
  CancelOrder(id:any){
    const data={
      status: "Cancelled"
    }
    return this.http.patch("http://localhost:9500/api/order/" +id, data,
      this.header
    );
  }
  increaseQuantity(data: any) {
    this.setHeaders(true)
    return this.http.patch("http://localhost:9500/api/cart/increase-one", data,
      this.header
    );
  }
  decreaseQuantity(data: any) {
    this.setHeaders(true)
    return this.http.patch("http://localhost:9500/api/cart/reduce-one", data,
      this.header
    );
  }

  getSigleProduct(id: Number) {
    return this.http.get("http://localhost:9500/api/product/" + id,
      this.header
    );
  }
}
