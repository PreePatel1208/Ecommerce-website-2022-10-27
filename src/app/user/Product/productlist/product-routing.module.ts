import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/app/cart/cart.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { OrderComponent } from '../order/order.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { ProductlistComponent } from './productlist/productlist.component';


const routes: Routes = [  
  {path:'',component:ProductlistComponent,
  children: [
    { path: 'details', component:  HomepageComponent},
    { path: 'single-detail', component:ProductDetailComponent  },
    { path: 'cart-detail', component:CartComponent  },
    { path: 'wishlist', component:WishlistComponent  },
    { path: 'list', component: HomepageComponent },
    { path: 'my-orders', component: OrderComponent },
    { path: '', redirectTo: 'details', pathMatch: 'full' },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
