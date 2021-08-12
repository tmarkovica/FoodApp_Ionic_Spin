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

  orders : Array<Order>;

  days = [1,2,3,4,5];
  daysNames = ["MON", "TUE", "WED", "THU", "FRI"];
  daysNamesCro = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

  currentDay = 1;

  constructor(private restaurauntService: RestaurantService) { 
  }

  ngOnInit() {
    this.restaurauntService._orders.subscribe(val => {
      this.orders = val;    
    });
  }

  getOrdersForDay() {
    if (this.orders != null) {
      return this.orders.filter(o => o.dan == this.daysNamesCro[this.currentDay - 1]);
    }
    return [];
  }

  changeDay(day: number){
    this.currentDay = day;
  }

}
