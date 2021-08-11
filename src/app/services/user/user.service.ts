import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


interface RegisteredUser {
  userid;
}

interface Company {
  name,
  status,
  userid;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserCompany() {
    return this._user.getValue().companyId;
  }

  constructor(private http : HttpClient, private router : Router) { }

  logiran : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  url:string="https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  user: User = null;

  _user : BehaviorSubject<User> = new BehaviorSubject<User>(null);

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
      if (res.length==1) {
        this.logiran.next(true);
        console.log("User logged in.");
        console.log(res);
        this.user = res[0];

        this._user.next(res[0]);

        this.router.navigate(['/web/dashboard'], {replaceUrl : true});
      }
      else {
        console.log("This user doesn't exit.");
      }
    });
  }

  registerUser(username: string, email: string, password: string, owner : boolean, companyName : string, status : number) {
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
      if (res.length==1)  {
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
      /*if (res.length==1)  {
        console.log("Company registered.");
        console.log(res);
      }
      else {
        console.log("Problem registering company.");
      }*/
    });
  }

  logOut() {
    this.user = null;
    this.logiran.next(false);
    
    this._user.next(null);
    this.router.navigate(['/login'], {replaceUrl : true});
  }

  isCompany() {
    return 5;
  }
}