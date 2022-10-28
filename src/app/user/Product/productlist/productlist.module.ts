import { NgModule , CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductListRoutingModule } from './product-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from "./../homepage/homepage.component";
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { ProductComponentListComponent } from '../product-component-list/product-component-list.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LayoutComponent } from '../layout/layout.component';
import { ProductModule } from 'src/app/product/product.module';
import { OrderComponent } from '../order/order.component';


@NgModule({
  declarations: [
    ProductlistComponent,
    HomepageComponent,
    ProductDetailComponent,
    CartComponent,
    ProductComponentListComponent,
    WishlistComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    OrderComponent
 
  
  ],
  imports: [
    CommonModule,
    NgbModule,
    ProductListRoutingModule,
    ProductModule
   
  ],
  exports:[
    ProductlistComponent,
    ProductDetailComponent
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA]
})
export class ProductlistModule { }
