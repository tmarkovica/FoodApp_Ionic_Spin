import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/mobile/services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  numberOfItemsInCart: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.orders.subscribe(ord => {
      this.numberOfItemsInCart = ord.length;
    })
  }
}