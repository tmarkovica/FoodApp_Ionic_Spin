import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  username: string = "vedran.prpic1@gmail.com"; //"tmark@gmail.com";
  password: string = "lozinka"; //"tmark@gmail.com";

  showRegistration:boolean = false;
  

  logInClick() {
    this.service.login(this.username, this.password);
  }
}
