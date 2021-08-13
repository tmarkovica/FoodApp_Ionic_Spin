import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loggedIn: boolean = false;

  constructor(private menu: MenuController, private userService: UserService, storageService: StorageService, router: Router) {
    this.userService._user.subscribe(val => {
      this.loggedIn = val != null;
    });
    this.userService.logiran.subscribe((value) => this.loggedIn = value);

    console.log();
    storageService.getData("storedUser").then(val => {
      if (val) {
        userService._user.next(val);
        router.navigate(['/web/menu'], { replaceUrl: true });
      }
    });

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
