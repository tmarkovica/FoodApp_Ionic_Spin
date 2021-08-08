import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  name: string,
  companyId: number,
  userId: number,
  companyName: string,
  isAdmin: boolean;  
}

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

  constructor(private http : HttpClient) { }

  logiran : boolean = false;

  url:string="https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  user: User;

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
        this.logiran = true;
        console.log("User logged in.");
        console.log(res);
        this.user = res[0];
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

  registerCompany(name: string, status: number, userid: number) {
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
}