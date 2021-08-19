import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Company } from 'src/app/interfaces/company';
import { RegisteredUser } from 'src/app/interfaces/registered-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  logiran: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isMobile: boolean;

  _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService) { }

  login(username: string, password: string) {
    console.log(`loggin in... username: ${username}; password: ${password}`);

    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "login",
            "email": username,
            "password": password
          }
        }
      ]
    }).subscribe((res: Array<User>) => {
      if (res.length == 1) {
        this.logiran.next(true);
        console.log("User logged in.");
        console.log(res);
        this._user.next(res[0]);
        this.storageService.setData("storedUser", res[0]);
        this.router.navigate(['/' + (!this.isMobile ? 'web' : 'mobile/tabs') + '/dashboard'], { replaceUrl: true });
      }
      else {
        console.log("This user doesn't exit.");
      }
    });
  }

  registerUser(username: string, email: string, password: string, owner: boolean, companyName: string, status: number) {
    console.log(`registering... name: ${username}; email: ${email}; password: ${password}`);

    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "insert",
            "name": username,
            "email": email,
            "password": password
          }
        }
      ]
    }).subscribe((res: Array<RegisteredUser>) => {
      if (res.length == 1) {
        console.log(`id of registered user: ${res[0].userid}`);
        console.log(res);

        if (owner) {
          this.registerCompany(companyName, status, res[0].userid);
        }
      }
      else {
        console.log("Can not register this user.");
      }
    });
  }

  private registerCompany(name: string, status: number, userid: number) {
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spCompanyAzur",
          "params": {
            "action": "insert",
            "name": name,
            "status": status,
            "userid": userid
          }
        }
      ]
    }).subscribe((res: Array<Company>) => {
      console.log("Company registered.");
    });
  }

  getUserCompany() {
    return this._user.getValue().companyId;
  }

  logOut() {
    this.logiran.next(false);
    this._user.next(null);

    this.storageService.removeData("storedUser")
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}