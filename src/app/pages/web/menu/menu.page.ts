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

  currentDay = 1;

  searchInput: string = "";

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

  private findDishAddedToMenu(i: number) {
    return this.menuForWeekAndCompany_currentDayMenu.find(o => o.name == this.allDishesOfRestaurant[i].Name);
  }

  mealCardClicked_AddDishToMenu(i: number) {
    if (this.findDishAddedToMenu(i) == null) {
      this.restaurauntService.insertDishInMenu(this.allDishesOfRestaurant[i].DishId, this.currentDay, this.allDishesOfRestaurant[i].Name);
    }
    else {
      console.log("Already contains element!");
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

  isAlreadyInMenu(i: number): boolean {
    if (this.findDishAddedToMenu(i) == null) {
      return false;
    }
    else {
      return true;
    }
  }

  private getFilteredArray_allDishesOfRestaurant() {
    let tempArr: Array<Dish>;
    tempArr = this.allDishesOfRestaurant.filter(o => {
      //return o.Name.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1; // jela koja sadrze searchInput string
      return o.Name.toLowerCase().startsWith(this.searchInput.toLowerCase()); // jela koja pocinju sa searchInput stringom
    });
    //tempArr.sort((a, b) => a.Name.startsWith(this.searchInput) ? -1 : 1); // jela sortirati da počnu po abecedi
    tempArr.sort((a, b) => a.Name.toLowerCase() !== b.Name.toLowerCase() ? a.Name.toLowerCase() < b.Name.toLowerCase() ? -1 : 1 : 0); // sortira jela po abecedi
    console.log(tempArr);
    return tempArr;
  }

  private getFilteredArray_menuForWeekAndCompany_currentDayMenu() {
    let tempArr: Array<MenuItem>;
    tempArr = this.menuForWeekAndCompany_currentDayMenu.filter(o => { // jela koja sadrze searchInput string
      return o.name.toLowerCase().startsWith(this.searchInput.toLowerCase());
    });
    tempArr.sort((a, b) => a.name.toLowerCase() !== b.name.toLowerCase() ? a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 : 0); // jela sortirati da počnu po abecedi
    return tempArr;
  }

  private collectDataBeforeFiltering() {
    this.restaurauntService.refreshData();
    this.filterWeekMenuForCurrentday();
  }

  setFilteredItems() {
    this.collectDataBeforeFiltering();
    if (this.searchInput === "")
      return;
    this.allDishesOfRestaurant = this.getFilteredArray_allDishesOfRestaurant();
    this.menuForWeekAndCompany_currentDayMenu = this.getFilteredArray_menuForWeekAndCompany_currentDayMenu();
  }
}