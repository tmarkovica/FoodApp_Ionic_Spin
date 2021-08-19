import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Order } from 'src/app/interfaces/order';
import { Dish } from 'src/app/interfaces/dish';
import { MenuDish } from 'src/app/interfaces/menu-dish';
import { UserOrder } from 'src/app/interfaces/user-order';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  @Input() isAdded : boolean = false;
  @Input() mealOrderDay : number;
  dayNames = ["mon","tue","wed","thu","fri"];


  @Input() order : Order;
  @Input() allDishesOfRestaurant : Dish;
  @Input() menuForWeek : MenuItem;
  @Input() menuDish : MenuDish;
  @Input() userOrder : UserOrder;

  mealName : string = "";
  mealDescription : string = "";
  soup : boolean = false;
  salad : boolean = false;
  bread : boolean = false;

  constructor() {
  }

  ngOnInit() {
    if (this.order != null){
      this.mealName = this.order.jelo;
      this.soup = this.order.soup;
      this.salad = this.order.Salad;
      this.bread = this.order.bread;
    }
    else if (this.allDishesOfRestaurant != null) {
      this.mealName = this.allDishesOfRestaurant.Name;
      this.mealDescription = this.allDishesOfRestaurant.Description;
      this.soup = this.allDishesOfRestaurant.Soup;
      this.salad = this.allDishesOfRestaurant.Salad;
      this.bread = this.allDishesOfRestaurant.Bread;
    }
    else if (this.menuForWeek != null) {
      this.mealName = this.menuForWeek.name;
    }
    else if (this.menuDish != null) {
      this.mealName = this.menuDish.name;
      this.isAdded = this.menuDish.inCart;
    } else if (this.userOrder) {
      this.mealName = this.userOrder.dishName;
      this.bread = this.userOrder.bread
      this.salad = this.userOrder.salad;
      this.soup = this.userOrder.soup;
    }
  }
}
