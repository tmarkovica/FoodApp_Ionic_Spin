import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {
    console.log(this.service.logiran);
  }

  username: string = "vedran.prpic1@gmail.com";
  password: string = "lozinka";

  logInClick() {
    this.service.login(this.username, this.password);
  }

}
