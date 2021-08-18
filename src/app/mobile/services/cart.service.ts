import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuDish } from 'src/app/interfaces/menu-dish';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  orders: BehaviorSubject<MenuDish[]> = new BehaviorSubject([]);

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private userService: UserService) { }

  toggleDishInCart(dish: MenuDish): boolean {
    //this.orders.next(dish)
    const x: MenuDish = Object.assign({}, dish); // novi objekt koji ima sve isto sto i dish
    const orders = this.orders.getValue();
    const index = orders.findIndex(o => o.dishId === dish.dishId && o.day === dish.day);

    console.log(`added dish:`);
    console.log(dish);

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

  async finishOrder() {
    const order = this.orders.getValue()[0]; // poslan je samo prvi order od svih ordera
    await this.http.post(this.url, {
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
    }).toPromise();
    this.orders.next([]);
    this.storageService.removeData('cart');
  }
}