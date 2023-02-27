import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService_ } from './cookie.service';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService_) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.cookieService.Token != undefined &&
      !this.cookieService.isTokenExpired() &&
      this.cookieService.User.isAdmin
    ) {
      return true;
    } else {
      return false;
    }
  }
}
