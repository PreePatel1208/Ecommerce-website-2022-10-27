import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserAuthGuard } from './user-auth.guard';


const routes: Routes = [
  { path: '', redirectTo: "user-product-list", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'admin',
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'product',
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path:'user-product-list',
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./user/Product/productlist/productlist.module').then(m => m.ProductlistModule)
  },
  {
    path:'user-product-list',
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./user/Product/productlist/productlist.module').then(m => m.ProductlistModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
