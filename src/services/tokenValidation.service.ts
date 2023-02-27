import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService_ } from './cookie.service';

@Injectable()
export class TokenValidationService implements CanActivate {
  constructor(private cookieService: CookieService_) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    var token = this.cookieService.pureToken;
    if (token) {
      if (this.cookieService.isTokenExpired()) {
        this.cookieService.removeToken();
      }
    }

    return true;
  }
}
