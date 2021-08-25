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
    private mealImageService: MealImageService) { }

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
    this.currentDayOrders = this.myOrders.filter(o => o.day === this.currentDay);
  }

  navbarClickChangeDay(day: number) {
    if (this.myOrders?.length === 0)
        return;
        
    this.currentDay = day;
    this.filterOrdersForCurrentDay();
    this.grouped = false;
  }

  getMealImage(mealName: string) {
    return this.mealImageService.getImageByName(mealName);
  }

  grouped = false;

  private spliceRepeatingOrders() {
    let tempMealName: string;

    let tempGroupedCurrentDayOrders = [...this.currentDayOrders];

    for (let i = 0; i < tempGroupedCurrentDayOrders.length; i++) {

      tempMealName = tempGroupedCurrentDayOrders[i].dishName;

      for (let j = i + 1; j < tempGroupedCurrentDayOrders.length; j++) {
        if (tempGroupedCurrentDayOrders[j].dishName === tempMealName) {
          tempGroupedCurrentDayOrders.splice(j, 1);
          j--;
        }
      }
    }
    this.currentDayOrders = [...tempGroupedCurrentDayOrders];
  }

  toggleGrouping() {
    if (!this.grouped) {
      this.grouped = true;
      this.spliceRepeatingOrders();
    }
    else {
      this.filterOrdersForCurrentDay();
      this.grouped = false;
    }
  }

  getAmountOf(mealName) {
    return this.myOrders.filter(o => o.day === this.currentDay && o.dishName === mealName).length;
  }
}
