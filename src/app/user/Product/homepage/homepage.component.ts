import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
interface Props {
  id: number,
  image: string,
  description: string,
  name: string,
  mainImage: string,
  price:Float32Array,
  category:any
} 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts = <Props[]>[]
  page = 0;
  pageSize = 3;
  collectionSize = 0;
  isValid = true
  constructor(private router: Router, 
    config: NgbModalConfig,  
     private product: ProductService,) { }
  login(){
    this.router.navigate(['/login']);  
  }
  register(){
    this.router.navigate(['/register']);  

  }
 
  ngOnInit(): void {
   
  }
  

}
