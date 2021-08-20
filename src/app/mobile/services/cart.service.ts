import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuDish } from 'src/app/interfaces/menu-dish';
import { UserOrder } from 'src/app/interfaces/user-order';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  orders: BehaviorSubject<MenuDish[]> = new BehaviorSubject([]);

  _allOrders: BehaviorSubject<UserOrder[]> = new BehaviorSubject([]);

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private userService: UserService) { }

  toggleDishInCart(dish: MenuDish): boolean {
    const x: MenuDish = Object.assign({}, dish); // novi objekt koji ima sve isto sto i dish
    const orders = this.orders.getValue();
    const index = orders.findIndex(o => o.dishId === dish.dishId && o.day === dish.day);

    if (index === -1) { // dish is not in cart
      delete x.inCart; // deleting property
      orders.push(x);
    } else {
      orders.splice(index, 1);
    }
    this.orders.next(orders);
    this.storageService.setData('cart', orders);

    return index === -1;
  }


  //promise.all
  private async storeOrderToApi(order: MenuDish) {
    return this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spOrder",
          "params": {
            "userid": this.userService._user.getValue().userId,
            "dishid": order.dishId,
            "day": order.day
          }
        }
      ]
    }).toPromise().then((val: Array<{ ID: number }>) => {
      if (val.length > 0) {
        console.log("Dish is stored to api:");
        console.log(val);
      }
    });
  }

  //pricekaj sve pa onda dalje
  async finishOrder() {
    this.orders.getValue().forEach(async element => {
      await this.storeOrderToApi(element);
    });
    this.orders.next([]);
    this.storageService.removeData('cart');
  }

  getOrdersForUser() {
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
            "query": "spOrdersQuery",
            "params": {
                "action": "forUser",
                "userid": this.userService._user.getValue().userId
            }
        }
    ]
    }).toPromise().then((val: UserOrder[]) => {
      if (val.length > 0) {
        this._allOrders.next(val);
      } else {
        console.log("Couldn't get orders for user.");        
      }
    });
  }
}