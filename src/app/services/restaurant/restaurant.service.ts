import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { Dish } from 'src/app/interfaces/dish';
import { UserService } from '../user/user.service';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { map } from 'rxjs/operators';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { MenuDish } from 'src/app/interfaces/menu-dish';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  _orders: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>([]);

  _allDishesOfRestaurant: BehaviorSubject<Array<Dish>> = new BehaviorSubject<Array<Dish>>([]);

  _menuForWeek: BehaviorSubject<Array<MenuItem>> = new BehaviorSubject<Array<MenuItem>>([]);

  _allRestaurants: BehaviorSubject<Array<Restaurant>> = new BehaviorSubject<Array<Restaurant>>([]);
  _allMenus: BehaviorSubject<MenuDish[]> = new BehaviorSubject<MenuDish[]>([]);

  constructor(
    private http: HttpClient, 
    private userService: UserService) { }

  initRestaurauntForCustomerUser() {
    return this.http.post(this.url, {
      "db": "Food",
      "queries": [
        // allRestaurants
        {
          "query": "spCompany",
          "params": {
            "@action": "all"
          },
          tablename: 'allRestaurants'
        },
        // allMenus
        {
          "query": "spMenu",
          "params": {
            "action": "all"
          },
          tablename: 'allMenus'
        }
      ]
    }).pipe(map((val: {
      allRestaurants: Restaurant[],
      allMenus: MenuDish[]
    }) => {
      if (val.allRestaurants.length > 0) {
        const x = val.allRestaurants.map(r => ({
          companyId: r.companyId,
          name: r.name,
          menus: [1, 2, 3, 4, 5].map(d => val.allMenus.filter(m => m.companyId === r.companyId && m.day === d)),
        }))
        this._allRestaurants.next(x);
        console.log("allRestaurants");
        console.log(this._allRestaurants.value);
      }
    }));
  }

  initRestaurauntForCompanyUser() {
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
        },
        // allDishesForCompany
        {
          "query": "spDishMenu",
          "params": {
            "action": "dish",
            "companyid": this.userService.getUserCompany()
          },
          tablename: 'allDishesOfRestaurant'
        },
        // getMenuForWeekAndCompany
        {
          "query": "spMenu",
          "params": {
            "action": "week",
            "companyid": this.userService.getUserCompany()
          },
          tablename: 'menuForWeekAndCompany'
        }
      ]
    }).toPromise().then((val: {
      allOrders: Array<Order>, allDishesOfRestaurant: Array<Dish>, menuForWeekAndCompany: Array<MenuItem>
    }) => {
      this._orders.next(val.allOrders);
      console.log("GetOrdersForCompany");
      console.log(val.allOrders);

      //console.log("allDishesOfRestaurant:")
      //console.log(val.allDishesOfRestaurant);
      this._allDishesOfRestaurant.next(val.allDishesOfRestaurant);

      //console.log("getMenuForWeekAndCompany()");
      //console.log(val.menuForWeekAndCompany);
      this._menuForWeek.next(val.menuForWeekAndCompany);
    });
  }

  addNewMeal(name: string, description: string, soup: boolean, salad: boolean, bread: boolean) { // AddNewDish
    return this.http.post(this.url, {
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
            "userid": this.userService._user.getValue().userId,
            "description": description
          }
        }
      ]
    }).toPromise().then((val: string) => {
      console.log("New Meal Added: ");
      console.log(val);
      this.initRestaurauntForCompanyUser(); // calls api again because there is no reply to get dishId
      return val;
    });
  }

  private updateMenuForWeek(addedDish: MenuItem) {
    const currentMenuArray: Array<MenuItem> = this._menuForWeek.value;
    const updatedMenuArray: Array<MenuItem> = [...currentMenuArray, addedDish];
    this._menuForWeek.next(updatedMenuArray);
  }


  insertDishInMenu(dishid: number, day: number, name: string) {
    let addedDish: MenuItem = {
      day: day,
      companyId: this.userService.getUserCompany(),
      name: name,
    };
    this.updateMenuForWeek(addedDish);
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
            "userid": this.userService._user.getValue().userId
          }
        }
      ]
    }).toPromise().then((val: string) => {
      console.log("Dish deleted from menu");
    });
  }

  refreshData() {
    this._allDishesOfRestaurant.next(this._allDishesOfRestaurant.getValue());
  }

  getRestaurantById(id : number) {
    return this._allRestaurants.getValue().find(r => r.companyId == id);
  }
}