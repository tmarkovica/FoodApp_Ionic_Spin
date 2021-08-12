import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { WeekMeal } from 'src/app/interfaces/week-meal';
import { UserService } from '../user/user.service';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { MenuI } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  _orders: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(null);

  constructor(private http: HttpClient, private userService: UserService) { }

  initRestaurauntForCustomerUser(): boolean {
    return true;
  }

  initRestaurauntForCompanyUser() { // GetOrdersForCompany
    return this.http.post(this.url, {
      "db": "Food",
      "queries": [
        // allOrders
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forCompany",
            "restoranid": this.userService.getUserCompany()
          },
          tablename: 'allOrders'
        }
      ]
    }).toPromise().then((val: {
      allOrders: Array<Order>
    }) => {
      this._orders.next(val.allOrders);
      console.log("GetOrdersForCompany");
      console.log(val.allOrders);
    });
  }

  _meal: Array<Order>;

  _mealsForWeek: BehaviorSubject<Array<WeekMeal>> = new BehaviorSubject<Array<WeekMeal>>(null);

  getDishForCompany() { // DishForCompany
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spDishMenu",
          "params": {
            "action": "dish",
            "companyid": this.userService.getUserCompany()
          }
        }
      ]
    }).toPromise().then((val: Array<WeekMeal>) => {
      console.log("getDishForCompany()");
      console.log(val);

      this._mealsForWeek.next(val);
    });
  }

  _menuForWeek : BehaviorSubject<Array<MenuItem>> = new BehaviorSubject<Array<MenuItem>>(null);

  getMenuForWeekAndCompany() { // GetMenuForWeekAndCompany
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spMenu",
          "params": {
            "action": "week",
            "companyid": this.userService.getUserCompany()
          }
        }
      ]
    }).toPromise().then((val: Array<MenuItem>) => {
      console.log("getMenuForWeekAndCompany()");
      console.log(val);
      this._menuForWeek.next(val);
    });
  }

  addNewMeal(name: string, description: string, soup: boolean, salad: boolean, bread: boolean) { // AddNewDish
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spDishAzur",
          "params": {
            "action": "insert",
            "companyid": "9",
            "name": name,
            "soup": soup,
            "salad": salad,
            "bread": bread,
            "userid": this.userService._user.getValue().userId
          }
        }
      ]
    }).toPromise().then((val: string) => {
      console.log("New Meal Added");
    });
  }

  insertDishInMenu(dishid: number, day: number) {
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
            "action": "insert",
            "dishid": dishid,
            "day": day,
            "userid": this.userService._user.getValue().userId
          }
        }
      ]
    }).toPromise().then((val: string) => {
      console.log("insertDishInMenu()");
    });
  }

  deleteDishFromMenu(dishid: number, day: number) {
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
            "action": "delete",
            "dishid": dishid,
            "day": day,
            "userid": this.userService.getUserCompany()
          }
        }
      ]
    }).toPromise().then((val: string) => {
      console.log("deleteDishFromMenu()");
    });
  }




  getAllMenus() { // -----
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spMenu",
          "params": {
            "action": "all"
          }
        }
      ]
    }).toPromise().then((val: string) => {
      console.log("getAllMenus()");
      console.log(val);
    });
  }

  getDishMenuForCompany() { // -----
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spDishMenu",
          "params": {
            "action": "menu",
            "companyid": this.userService.getUserCompany()
          }
        }
      ]
    }
    ).toPromise().then((val: string) => {
      console.log("getDishMenuForCompany()");
      console.log(val);
    });
  }

  getMenuForDay(day: number) { // -----
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spMenu",
          "params": {
            "action": "day",
            "companyid": this.userService.getUserCompany(),
            "day": day
          }
        }
      ]
    }).toPromise().then((val: string) => {
      console.log("getMenuForDay()");
      console.log(val);
    });
  }
}