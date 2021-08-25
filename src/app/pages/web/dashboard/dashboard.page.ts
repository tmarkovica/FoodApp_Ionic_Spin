import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { MealImageService } from 'src/app/services/meal-image.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  orders: Array<Order> = []; // all orders for company

  ordersSortedByClient: Order[][] = [];
  ordersSortedByClientAndDay: Order[][] = [];
  ordersSortedByClientAndDay_noRepeats: Order[][] = [];

  displayIndexes = [0, 1, 2];
  displayNames = ['Company name', 'Company name', 'Company name'];

  daysNamesCro = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

  currentDay = 1;

  constructor(
    private restaurauntService: RestaurantService,
    private mealImageService: MealImageService) {}

  private sortOrdersByClients() {
    console.log("sortOrdersByClients()");
    
    let tempArr: Order[] = [...this.orders];

    tempArr.sort((a, b) => a.naruciteljId !== b.naruciteljId ? a.naruciteljId < b.naruciteljId ? -1 : 1 : 0);

    let tempId: number = tempArr[0].naruciteljId;
    let counter = 0;
    let size = 0;
    this.ordersSortedByClient[size] = [];

    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].naruciteljId === tempId) {
        counter++;
        this.ordersSortedByClient[size]?.push(tempArr[i]);
      }
      else {
        tempId = tempArr[i + 1]?.naruciteljId;
        size++;
        this.ordersSortedByClient[size] = [];
        this.ordersSortedByClient[size]?.push(tempArr[i]);
        counter = 0;
      }
    }
  }

  private filterOrdersByDay() {
    this.ordersSortedByClientAndDay = [];
    for (let i = 0; i < this.ordersSortedByClient.length; i++) {
      this.ordersSortedByClientAndDay[i] = [];
      this.ordersSortedByClientAndDay[i] = this.ordersSortedByClient[i].filter(o => o.dan === this.daysNamesCro[this.currentDay - 1]);
    }
  }

  private spliceRepeatingOrders() {
    let tempMealName: string;

    for (let i = 0; i < 3; i++) {

      this.displayNames[i] = this.ordersSortedByClientAndDay[this.displayIndexes[i]][0]?.narucitelj;

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
    }
  }

  ngOnInit() {
    this.restaurauntService._orders.subscribe(val => {
      if (val.length === 0)
        return;

      this.orders = val;

      this.sortOrdersByClients();
      this.filterOrdersByDay();
      this.spliceRepeatingOrders();
    });
  }

  navbarClickChangeDay(day: number) {
    this.currentDay = day;
    if (this.orders.length === 0)
      return;

    this.filterOrdersByDay();
    this.spliceRepeatingOrders();
  }

  getMealImage(mealName: string) {
    return this.mealImageService.getImageByName(mealName);
  }

  getAmountOf(mealName, index) {
    let counter = 0;
    this.ordersSortedByClientAndDay[index].forEach(element => {
      if (element.jelo === mealName)
        counter++;
    });
    return counter;
  }

  ordersListBack() {
    for (let i = 0; i < 3; i++) {
      if (this.displayIndexes[i] === 0)
        return;
      this.displayIndexes[i]--;
    }
    this.spliceRepeatingOrders();
  }

  ordersListNext() {
    for (let i = 2; i >= 0; i--) {
      if (this.displayIndexes[i] === this.ordersSortedByClient.length - 1)
        return;
      this.displayIndexes[i]++;
    }
    this.spliceRepeatingOrders();
  }
}