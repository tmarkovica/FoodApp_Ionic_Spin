import { Component, OnInit } from '@angular/core';
import { UserOrder } from 'src/app/interfaces/user-order';
import { CartService } from 'src/app/mobile/services/cart.service';
import { MealImageService } from 'src/app/services/meal-image.service';

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
    private cartService: CartService,
    private mealImageService : MealImageService) { }

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

  getMealImage(mealName: string) {
    return this.mealImageService.getImageByName(mealName);
  }

  private spliceRepeatingOrders() {
    /* let tempMealName: string;

    for (let i = 0; i < 3; i++) {

      this.ordersSortedByClientAndDay_noRepeats[i] = [...this.ordersSortedByClientAndDay[this.displayIndexes[i]]];

      for (let j = 0; j < this.ordersSortedByClientAndDay_noRepeats[i].length; j++) {

        tempMealName = this.ordersSortedByClientAndDay_noRepeats[i][j].jelo;

        for (let k = j + 1; k < this.ordersSortedByClientAndDay_noRepeats[i].length; k++) {
          if (this.ordersSortedByClientAndDay_noRepeats[i][k].jelo === tempMealName) {
            this.ordersSortedByClientAndDay_noRepeats[i].splice(k, 1);
            k--;
          }
        }
      }
    } */
  }
}
