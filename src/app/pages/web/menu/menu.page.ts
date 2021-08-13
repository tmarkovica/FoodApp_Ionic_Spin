import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Dish } from 'src/app/interfaces/dish';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  allDishesOfRestaurant: Array<Dish>;

  menuForWeekAndCompany: Array<MenuItem>;
  menuForWeekAndCompany_currentDayMenu: Array<MenuItem>;

  days = [1, 2, 3, 4, 5];
  daysNames = ["MON", "TUE", "WED", "THU", "FRI"];
  daysNamesCro = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

  currentDay = 1;

  constructor(private router: Router, private restaurauntService: RestaurantService) { }

  private filterWeekMenuForCurrentday() {
    this.menuForWeekAndCompany_currentDayMenu = this.menuForWeekAndCompany.filter(o => o.day == this.currentDay);
  }

  private subscribeToGetAllDishesOfRestaurant() {
    this.restaurauntService._allDishesOfRestaurant.subscribe(val => {
      this.allDishesOfRestaurant = val;
    });
  }

  private subscribeToGetMenuForWeekAndCompany() {
    this.restaurauntService._menuForWeek.subscribe(val => {
      this.menuForWeekAndCompany = val;
      this.filterWeekMenuForCurrentday();
    });
  }

  ngOnInit() {
    this.subscribeToGetAllDishesOfRestaurant();
    this.subscribeToGetMenuForWeekAndCompany();
  }

  addNewMeal() {
    this.router.navigate(['/web/new-meal'], { replaceUrl: true });
  }

  navbarClickChangeDay(day: number) {
    this.currentDay = day;
    this.filterWeekMenuForCurrentday();
  }

  private findDishAddedToMenu(i : number) {
    return this.menuForWeekAndCompany_currentDayMenu.find(o => o.name == this.allDishesOfRestaurant[i].Name);
  }

  mealCardClicked_AddDishToMenu(i: number) {
    if (this.findDishAddedToMenu(i) == null) {
      this.restaurauntService.insertDishInMenu(this.allDishesOfRestaurant[i].DishId, this.currentDay, this.allDishesOfRestaurant[i].Name);
    }
    else {
      console.log("already contains element!!!!");
    }
  }

  private getDishToDeleteFromAllDishesOfRestaurant(i: number) {
    return this.allDishesOfRestaurant.find(o => o.Name == this.menuForWeekAndCompany_currentDayMenu[i].name) as Dish;
  }

  private deleteDishFromWeekMenu_api(dishToDelete: Dish, i: number) {
    this.restaurauntService.deleteDishFromMenu(dishToDelete.DishId, this.menuForWeekAndCompany_currentDayMenu[i].day);
  }

  private deleteDishFromWeekMenu_local(i: number) {
    this.menuForWeekAndCompany.splice(this.menuForWeekAndCompany.indexOf(this.menuForWeekAndCompany.find(o => o == this.menuForWeekAndCompany_currentDayMenu[i])), 1);
    this.filterWeekMenuForCurrentday();
  }

  mealCardClicked_RemoveDishFromMenu(i: number) {
    console.log("deleting element...");
    const dishToDelete: Dish = this.getDishToDeleteFromAllDishesOfRestaurant(i);
    console.log(dishToDelete);
    this.deleteDishFromWeekMenu_api(dishToDelete, i);
    this.deleteDishFromWeekMenu_local(i);
  }

  isAlreadyInMenu(i : number) : boolean {
    if (this.findDishAddedToMenu(i) == null) {
      return false;
    }
    else {
      return true;
    }
  }
}
