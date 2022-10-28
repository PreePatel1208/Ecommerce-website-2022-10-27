import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindComponent } from './components/admind/admind.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [  
  //  { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
  {path:'',component:AdmindComponent,
  children: [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: HomeComponent },
    { path: 'services', component: HomeComponent },
    { path: 'contact', component: HomeComponent },
    { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
  ],

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
