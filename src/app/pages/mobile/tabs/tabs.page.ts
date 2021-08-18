import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/mobile/services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  itemsInCart : number;

  constructor(private cartService : CartService) { 
    this.itemsInCart = cartService.orders.getValue().length;
  }

  ngOnInit() {
  }

}
