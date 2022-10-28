import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: any[] = []
  constructor(
    private product: ProductService
  ) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  getOrderList() {
    this.product.getOrders().subscribe((data: any) => {
      console.log(data.orders);
      this.orders = data.orders

    })

  }
  convertDate(date: string) {
    var newdate = new Date(date);
    var str = newdate.toLocaleDateString()
    return str
  }

  convertPrice(number: number) {
    return Math.abs(number)
  }
  deleteOrder() {

  }

  cancelOrder(id:any) {
    this.product.CancelOrder(id).subscribe((data: any) => {
      console.log(data);
      this.getOrderList()
    })
  }
}
