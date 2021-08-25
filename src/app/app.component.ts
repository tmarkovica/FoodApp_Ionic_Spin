import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { CartService } from './mobile/services/cart.service';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loggedIn: boolean = false;

  isMobile: boolean;

  constructor(
    private menu: MenuController, 
    private userService: UserService, 
    private storageService: StorageService, 
    private router: Router, 
    private platform: Platform, 
    private cartService : CartService) {
    this.initializeApp();
    
    this.userService._user.subscribe(val => {
      this.loggedIn = val != null;
    });
    this.userService._loggedIn.subscribe((value) => this.loggedIn = value);

    console.log();
    storageService.getData("storedUser").then(val => {
      if (val) {
        userService._user.next(val);
        router.navigate(['/' + (!this.isMobile ? 'web' : 'mobile/tabs') + '/dashboard'], {replaceUrl: true});

        if (this.isMobile) {
          this.storageService.getData('cart').then(orders => {
            this.cartService.orders.next(orders || []); // JSON.parse()
            console.log("orders in storage: " + orders);
            
          });
        }
      }
    });
  }

  initializeApp(){
    this.userService.isMobile = this.platform.is('mobileweb') || this.platform.is('mobile');
    this.isMobile = this.userService.isMobile;
  }

  ionViewWillEnter() {
  }

  async openMenu() {
    await this.menu.open();
  }

  closeMenu() {
    this.menu.close();
  }

  logOut() {
    this.userService.logOut();
    this.closeMenu();
  }
}
