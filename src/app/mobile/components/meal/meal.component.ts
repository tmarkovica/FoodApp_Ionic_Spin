import { Component, Input, OnInit } from '@angular/core';
import { MenuDish } from 'src/app/interfaces/menu-dish';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  @Input() menuDish : MenuDish;

  @Input() inCart : boolean = false;

  mealName : string = "";
  mealDescription : string = "";
  Soup : boolean = false;
  Salad : boolean = false;
  Bread : boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.menuDish != null) {
      this.mealName = this.menuDish.name;
      this.inCart = this.menuDish.inCart;
    }
  }
}
