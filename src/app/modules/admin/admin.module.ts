import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindComponent } from './components/admind/admind.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertbokComponent } from './components/alertbok/alertbok.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CustomValidatorsDirectiveDirective } from 'src/app/directives/custom-validators-directive.directive';
import { ModelBoxComponent } from './components/model-box/model-box.component';
@NgModule({
  declarations: [
    AdmindComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AlertbokComponent,
    ModelBoxComponent
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    AlertbokComponent,
    ModelBoxComponent
  ],
  providers:[
    CustomValidatorsDirectiveDirective
  ]
})
export class AdminModule { }
