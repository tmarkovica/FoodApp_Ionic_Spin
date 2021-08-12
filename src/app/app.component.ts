import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  loggedIn : boolean = false;

  constructor(private menu: MenuController, private userService : UserService) { 
    this.userService._user.subscribe(val => {
      this.loggedIn = val != null; 
    });
    this.userService.logiran.subscribe((value) => this.loggedIn = value);
  }

  ionViewWillEnter() {
    console.log("adsf");
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
