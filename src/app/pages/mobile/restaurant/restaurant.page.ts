import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MenuDish } from 'src/app/interfaces/menu-dish';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  restaurant : Restaurant;

  currentDayMeals : MenuDish[];
  _inCartDishes : BehaviorSubject<MenuDish[]> = new BehaviorSubject<MenuDish[]>([]);

  currentDay = 1;  // minus 1

  constructor(private route : ActivatedRoute, private restaurantService : RestaurantService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.restaurant = this.restaurantService.getRestaurantById(params.id);
      console.log(this.restaurant);

      this.filterMealsForCurrentDay();
    });
  }

  filterMealsForCurrentDay() {
    this.currentDayMeals = this.restaurant.menus[this.currentDay - 1];
  }

  navbarClickChangeDay(day: number) {
    this.currentDay = day;
    this.filterMealsForCurrentDay(); 
  }

  search(event) {
    const query = event.detail.value.toLowerCase();
   // this.filterMealsForCurrentDay();
   //currentDayMeals - prazan array ako nema za taj dan jela
    //if (!this.currentDayMeals) return;
    this.currentDayMeals = !query ? [...this.restaurant.menus[this.currentDay - 1]] : this.restaurant.menus[this.currentDay - 1].filter(r => r.name.toLowerCase().startsWith(event.detail.value.toLowerCase()));
    //sort i na pocetku; ili bez
    //this.currentDayMeals = !query ? [...this.currentDayMeals] : this.currentDayMeals.sort((a, b) => a.name.toLowerCase() !== b.name.toLowerCase() ? a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 : 0);
  }

  mealCardClicked_AddToCart(addedDish: MenuDish) {
    console.log(`added dish:`);
    console.log(addedDish);

    this.restaurant.menus[this.currentDay - 1].find(m => m == addedDish).inCart = !addedDish.inCart;
    const cart = this._inCartDishes.getValue();
    // if(se nalazi vec) {
    //   //izbaci
    // }
    // else {
    //   cart.push(addedDish);
    //   this._inCartDishes.next(cart);
    // }
    this._inCartDishes.next([...cart, addedDish]);
  }
}
