import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../modules/admin/admin.module';
import { NgbActiveModal, NgbPaginationNext } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterComponent } from '../components/toaster/toaster.component';

@NgModule({
  declarations: [
   
    UpdateComponent,
    ListComponent,
    ProductComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    AdminModule,NgbModule
    
  ],
  exports:[
 
    UpdateComponent,
    ListComponent,
    ProductComponent,
    ToasterComponent
  ],
  providers: [
    NgbActiveModal,
]
})
export class ProductModule { }
