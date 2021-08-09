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

  constructor(private menu: MenuController, private service : UserService) { 
    //this.loggedIn = this.service.user.subscribe();
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
    this.service.logOut();
    this.closeMenu();
  }
}
