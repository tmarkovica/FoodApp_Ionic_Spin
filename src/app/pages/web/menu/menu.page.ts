import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Order } from 'src/app/interfaces/order';
import { WeekMeal } from 'src/app/interfaces/week-meal';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  mealsForWeek : Array<WeekMeal>;

  orders : Array<Order>;

  menuForWeek : Array<MenuItem>;

  days = [1,2,3,4,5];
  daysNames = ["MON", "TUE", "WED", "THU", "FRI"];
  daysNamesCro = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

  currentDay = 1;

  constructor(private router : Router, private restaurauntService: RestaurantService) { }

  ngOnInit() {
    this.restaurauntService._mealsForWeek.subscribe(val => {
      this.mealsForWeek = val;      
    });

    this.restaurauntService._orders.subscribe(val => {
      this.orders = val;      
    });

    this.restaurauntService._menuForWeek.subscribe(val => {
      this.menuForWeek = val;      
    });

    this.restaurauntService.getDishForCompany();
    this.restaurauntService.getMenuForWeekAndCompany();

    this.restaurauntService.getAllMenus();
    this.restaurauntService.getDishMenuForCompany();
    this.restaurauntService.getMenuForDay(5);
  }  

  addNewMeal(){
    this.router.navigate(['/web/new-meal'], {replaceUrl : true});
  }

  getMealsForWeek() {
    if (this.mealsForWeek != null) {
      return this.mealsForWeek;
    }
    return [];
  }

  getMenuForWeek() {
    if (this.menuForWeek != null) {
      return this.menuForWeek.filter(o => o.day == this.currentDay);
    }
    return [];
  }

  changeDay(day: number){
    this.currentDay = day;
    console.log(this.currentDay);
  }

  

  getMenuForWeekAndCompany() {
    if (this.orders != null) {
      return this.orders.filter(o => o.dan == this.daysNamesCro[this.currentDay - 1]);
    }
    return [];
  }

  mealCardClickedElementAt(i : any) {
    let node = document.getElementById("cardMeal");
    let parentNode = node?.parentElement;

    //parentNode?.removeChild(parentNode.childNodes[i]);

    this.orders[i]

    console.log("meal card clicked******");
    this.restaurauntService.insertDishInMenu(this.mealsForWeek[i].DishId, this.currentDay);
  }
}
