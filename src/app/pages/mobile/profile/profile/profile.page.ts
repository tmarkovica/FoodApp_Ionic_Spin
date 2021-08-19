import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username : string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.username = this.userService._user.getValue().name;
  }

}
