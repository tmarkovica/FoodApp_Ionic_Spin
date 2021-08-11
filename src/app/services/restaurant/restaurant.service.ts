import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { User } from 'src/app/interfaces/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  url : string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  _orders : BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(null);

  initRestaurauntForCompanyUser() {

    return this.http.post(this.url, {
      "db": "Food",
      "queries": [
          {
              "query": "spOrdersQuery",
              "params": {
                  "action": "forCompany",
                  "restoranid": this.userService.getUserCompany()
              }/*,
              tablename: 'allorders'*/
          }
      ]
    }).toPromise().then((val : Array<Order>) => {
      console.log("Company orders: ");
      console.log(val);
      this._orders.next(val);
      return true;
    });
  }

  initRestaurauntForCustomerUser(): boolean {
    return true;
  }

  constructor(private http : HttpClient, private userService : UserService) { }
}
