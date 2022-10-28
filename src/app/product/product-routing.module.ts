import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProductComponent } from './product/product.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [  
  {path:'',component:ProductComponent,
  children: [
    { path: 'update', component: UpdateComponent },
    { path: 'list', component: ListComponent },
    { path: '', redirectTo: '/product/list', pathMatch: 'full' },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
