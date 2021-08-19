import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DaysNavbarComponent } from 'src/app/components/days-navbar/days-navbar.component';
import { Order } from 'src/app/interfaces/order';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  orders: Array<Order>;

  ordersSortedByDay: Array<Order>;

  ordersFromCompany: Array<Array<Order>> = new Array<Array<Order>>();
  daysNamesCro = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

  currentDay = 1;

  constructor(private restaurauntService: RestaurantService) {
  }

  ngOnInit() {
    this.restaurauntService._orders.subscribe(val => {
      this.orders = val;
      /* 
      console.log("................");
      console.log(this.orders);

      let groupsIndex = 0;

      let tempId = this.orders[0].userurestoranuid;

      for (let j=0; this.orders.length-1; j++) {
        for (let i=0; this.orders[i+j].userurestoranuid == tempId; i++) {
        
          this.ordersFromCompany[groupsIndex] = [... this.ordersFromCompany, this.orders[i+j]];
          
          tempId = this.orders[i+j].userurestoranuid;
          j = j+i;
        }
        groupsIndex++;
      }
        
      console.log("................");
      console.log(this.ordersFromCompany); */

      /*this.ordersFromCompany = val.filter(o => o.dan == this.daysNamesCro[this.currentDay - 1]);

      this.ordersSortedByDay = this.orders.filter(o => o.dan == this.daysNamesCro[this.currentDay - 1]);*/
    });
  }

  navbarClickChangeDay(day: number) {
    this.currentDay = day;
  }

}
