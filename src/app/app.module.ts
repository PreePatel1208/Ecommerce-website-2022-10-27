import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductModule } from './product/product.module';
import { AdminModule } from './modules/admin/admin.module';
import { RegisterComponent } from './components/register/register.component';
import { ProductlistModule } from './user/Product/productlist/productlist.module';
import { ErrorHandlerInterceptor } from './error-handling.interceptor';
import { ToasterService } from './services/toaster.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    RegisterComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    ProductModule,
    AdminModule,
    ProductlistModule
  ],
 
    providers: [
      {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
    deps: [ToasterService, ]
  }
  ],
  bootstrap: [AppComponent],
  exports:[
  
  ]
})
export class AppModule { }
