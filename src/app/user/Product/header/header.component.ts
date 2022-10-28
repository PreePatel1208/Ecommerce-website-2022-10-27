import { Component, OnInit } from '@angular/core';
import { CounterServiceService } from 'src/app/counter-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  counter:number | any;
  wishlist_counter:number | any;

  constructor(private data: CounterServiceService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe((counter: number) => {   
      this.counter = counter;
    })
    this.data.currentMessage1.subscribe((wishlist_counter: number) => {   
      this.wishlist_counter = wishlist_counter;
    })
   
  }

}
