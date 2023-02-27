import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { CookieService_ } from './cookie.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(
        private cookieService: CookieService_
        ) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
  
        if (this.cookieService.Token && !this.cookieService.isTokenExpired())  {
            if(route.routeConfig?.path == "login" || route.routeConfig?.path == "register"){
                return false;
            }
            return true;
        } else {
            if(route.routeConfig?.path == "login" || route.routeConfig?.path == "register"){
                return true;
            }
            return false;
        }
    }
 
}