import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() { }

  // user
  username: string = "";
  email: string = "";
  password: string = "";
  restorauntOwner: boolean = false;

  // company
  companyName: string = "";
  status: number;

  registerClick() {

    console.log("isOwner: " + this.restorauntOwner);

    this.service.registerUser(this.username, this.email, this.password, this.restorauntOwner, this.companyName, this.status);

    this.username = "";
    this.email = "";
    this.password = "";
    this.companyName = "";
    this.status = 0;
  }
}
