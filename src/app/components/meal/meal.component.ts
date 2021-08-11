import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  imeJela : string = "Ime jela";
  opisJela : string = "Opis jela";
  kolicina : number = 0;

  @Input() order : Order;

  constructor(private restaurauntService : RestaurantService) { }

  ngOnInit() {}


}
