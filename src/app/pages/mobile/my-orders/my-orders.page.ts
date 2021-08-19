import { Component, OnInit } from '@angular/core';
import { UserOrder } from 'src/app/interfaces/user-order';
import { CartService } from 'src/app/mobile/services/cart.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  myOrders: UserOrder[];
  currentDayOrders: UserOrder[];

  currentDay: number = 1;

  constructor(
    private cartService: CartService) { }

  ngOnInit() {
    this.cartService._allOrders.subscribe(res => {
      this.myOrders = res;
      console.log("myOrders");
      console.log(this.myOrders);
      this.filterOrdersForCurrentDay();
    });
    this.cartService.getOrdersForUser();
  }

  private filterOrdersForCurrentDay() {
    this.currentDayOrders = this.myOrders.filter(o => o.day == this.currentDay);
  }

  navbarClickChangeDay(day: number) {
    this.currentDay = day;
    this.filterOrdersForCurrentDay();
  }
}
