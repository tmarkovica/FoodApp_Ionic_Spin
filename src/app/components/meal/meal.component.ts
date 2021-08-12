import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Order } from 'src/app/interfaces/order';
import { WeekMeal } from 'src/app/interfaces/week-meal';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  @Input() order : Order;
  @Input() mealsForWeek : WeekMeal;
  @Input() menuForWeek : MenuItem;

  mealName : string = "";
  mealDescription : string = "";
  Soup : boolean = false;
  Salad : boolean = false;
  Bread : boolean = false;

  constructor(private restaurauntService : RestaurantService) {
  }

  ngOnInit() {
    //console.log(this.order.jelo);
    if (this.order != null){
      this.mealName = this.order.jelo;
      //this.mealDescription = order.des;
      this.Soup = this.order.soup;
      this.Salad = this.order.Salad;
      this.Bread = this.order.bread;
    }
    else if (this.mealsForWeek != null) {
      this.mealName = this.mealsForWeek.Name;
      this.mealDescription = this.mealsForWeek.Description;
      this.Soup = this.mealsForWeek.Soup;
      this.Salad = this.mealsForWeek.Salad;
      this.Bread = this.mealsForWeek.Bread;
    }
    else if (this.menuForWeek != null) {
      this.mealName = this.menuForWeek.name;
    }
  }


}
