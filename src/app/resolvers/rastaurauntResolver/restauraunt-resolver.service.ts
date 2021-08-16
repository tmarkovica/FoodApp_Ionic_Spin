import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurauntResolverService implements Resolve<boolean> {

  constructor(private userService: UserService, private rastaurauntService: RestaurantService) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {

    if (this.userService.isMobile === false) {
      return await this.rastaurauntService.initRestaurauntForCompanyUser();
    }
    else {
      return await this.rastaurauntService.initRestaurauntForCustomerUser().toPromise();
    }
  }
}