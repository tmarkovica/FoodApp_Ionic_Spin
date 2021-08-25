import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuDish } from 'src/app/interfaces/menu-dish';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { CartService } from 'src/app/mobile/services/cart.service';
import { MealImageService } from 'src/app/services/meal-image.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  restaurant: Restaurant;

  currentDayMeals: MenuDish[];

  orders: MenuDish[];

  currentDay = 1;  // minus 1

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private mealImageService : MealImageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.restaurant = this.restaurantService.getRestaurantById(params.id);
      console.log(this.restaurant);

      this.filterMealsForCurrentDay();
      this.orders = this.cartService.orders.getValue();
      this.cartService.orders.subscribe(orders => {
        this.orders = orders;
      });
    });
  }

  filterMealsForCurrentDay() {
    this.currentDayMeals = this.restaurant.menus[this.currentDay - 1].map(dish => {
      dish.inCart = !!this.orders?.find(o => o.day === dish.day && o.dishId === dish.dishId);
      return dish;
    })
  }

  navbarClickChangeDay(day: number) {
    this.currentDay = day;
    this.filterMealsForCurrentDay();
  }

  private filterMealsThatStartWith(query: string) {
    this.currentDayMeals = !query ? [...this.restaurant.menus[this.currentDay - 1]] : this.restaurant.menus[this.currentDay - 1].filter(r => r.name.toLowerCase().startsWith(query));
  }

  private sortMealsAlphabetically(query: string) {
    this.currentDayMeals = !query ? [...this.currentDayMeals] : this.currentDayMeals.sort((a, b) => a.name.toLowerCase() !== b.name.toLowerCase() ? a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 : 0);
  }

  search(event) {
    const query = event.detail.value.toLowerCase();
    this.filterMealsThatStartWith(query);
    //sort i na pocetku; ili bez
    //this.sortMealsAlphabetically(query);
  }

  mealCardClicked_AddToCart(addedDish: MenuDish) {
    this.restaurant.menus[this.currentDay - 1].find(m => m == addedDish).inCart = !addedDish.inCart;
    addedDish.inCart = this.cartService.toggleDishInCart(addedDish);
  }

  getMealImage(mealName: string) {
    return this.mealImageService.getImageByName(mealName);
  }
}