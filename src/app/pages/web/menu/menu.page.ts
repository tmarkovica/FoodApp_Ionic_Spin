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

  constructor(
    private router: Router,
    private restaurauntService: RestaurantService) { }

  private filterWeekMenuForCurrentday() {
    this.menuForWeekAndCompany_currentDayMenu = this.menuForWeekAndCompany.filter(o => o.day == this.currentDay);
  }

  private subscribeToGetAllDishesOfRestaurant() {
    this.restaurauntService._allDishesOfRestaurant.subscribe(val => {
      this.allDishesOfRestaurant = val;
      this.sortAllDishesOfRestaurantAlphabetically();
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

  addNewMealButtonClick() {
    this.router.navigate(['/web/new-meal'], { replaceUrl: true });
  }

  navbarClickChangeDay(day: number) {
    this.currentDay = day;
    this.filterWeekMenuForCurrentday();
  }

  private currentDayMenu_IncludesDishFrom_AllDishesOfRestaurnat_AtIndex(i: number): boolean {
    return this.menuForWeekAndCompany_currentDayMenu.find(o => o.name == this.allDishesOfRestaurant[i].Name) !== undefined;
  }

  mealCardClicked_AddDishToMenu(i: number) {
    if (this.currentDayMenu_IncludesDishFrom_AllDishesOfRestaurnat_AtIndex(i) === false) {
      this.restaurauntService.insertDishInMenu(this.allDishesOfRestaurant[i].DishId, this.currentDay, this.allDishesOfRestaurant[i].Name);
    } else {
      console.log("Already contains element!");
    }
  }

  private getDishToDeleteFromAllDishesOfRestaurant(i: number) {
    return this.allDishesOfRestaurant.find(o => o.Name == this.menuForWeekAndCompany_currentDayMenu[i].name) as Dish;
  }

  private deleteDishFromWeekMenu_api(dishToDelete: Dish, i: number) {
    this.restaurauntService.deleteDishFromMenu(dishToDelete.DishId, this.menuForWeekAndCompany_currentDayMenu[i].day);
  }

  private deleteDishFromWeekMenu_localArray(i: number) {
    this.menuForWeekAndCompany.splice(this.menuForWeekAndCompany.indexOf(this.menuForWeekAndCompany.find(o => o == this.menuForWeekAndCompany_currentDayMenu[i])), 1);
    this.filterWeekMenuForCurrentday();
  }

  mealCardClicked_RemoveDishFromMenu(i: number) {
    console.log("deleting element...");
    const dishToDelete: Dish = this.getDishToDeleteFromAllDishesOfRestaurant(i);
    console.log(dishToDelete);
    this.deleteDishFromWeekMenu_api(dishToDelete, i);
    this.deleteDishFromWeekMenu_localArray(i);
  }

  private collectDataBeforeFiltering() {
    this.restaurauntService.refreshData();
    this.filterWeekMenuForCurrentday();
    this.sortAllDishesOfRestaurantAlphabetically();
  }

  private filterAllDishesOfRestaurantThatStartWith(query: string) {
    this.allDishesOfRestaurant = !query ? [...this.allDishesOfRestaurant] : this.allDishesOfRestaurant.filter(r => r.Name.toLowerCase().startsWith(query));
  }

  private sortAllDishesOfRestaurantAlphabetically() {
    this.allDishesOfRestaurant.sort((a, b) => a.Name.toLowerCase() !== b.Name.toLowerCase() ? a.Name.toLowerCase() < b.Name.toLowerCase() ? -1 : 1 : 0);
  }

  setFilteredItems() {
    this.collectDataBeforeFiltering();
    this.filterAllDishesOfRestaurantThatStartWith(this.searchInput);
    this.sortAllDishesOfRestaurantAlphabetically();
  }
}