import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealComponent } from 'src/app/components/meal/meal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  addNewMeal(){
    this.router.navigate(['/web/new-meal'], {replaceUrl : true});
  }
}
