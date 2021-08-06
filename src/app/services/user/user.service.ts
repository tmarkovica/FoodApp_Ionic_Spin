import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  companyId: number,
  companyName: string,
  isAdmin: boolean,
  name: string,
  userId: number;
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
    console.log(`username: ${username}; password: ${password}`);

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
      if (res.length==1)
        this.logiran = true;
        console.log("You are logged in.");
    });

  }
}