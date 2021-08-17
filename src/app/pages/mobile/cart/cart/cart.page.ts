import { Component, OnInit } from '@angular/core';
import { MenuDish } from 'src/app/interfaces/menu-dish';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  inCartDishes : MenuDish[];

  constructor() { } //private cartService : CartService

  ngOnInit() {
    /* this.cartService._inCartDishes.subscribe(cart => {
      this.inCartDishes = cart;
      console.log("cart:");      
      console.log(cart);
    }); */
  }
}
