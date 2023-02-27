import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CookieService_ {
  constructor(private cookieService: CookieService) {}

  jwtHelperService = new JwtHelperService();
  USER_KEY = 'user';
  ISAUTHENTICATED_KEY = 'isAuthenticated';
  TOKEN_KEY = 'token';
  REFRESHTOKEN_KEY = 'refreshToken';
  FAVOURITES_KEY = 'favourites';
  IMAGEURL_KEY = "imageUrl";
  USERNAME_KEY = "username";

  public set Token(token: any) {
    let now = new Date();
    let token_ = {
      token: token,
      createdDate: now,
    };

    this.cookieService.set(this.TOKEN_KEY, JSON.stringify(token_));
  }

  public get pureToken(): any {
    if (this.cookieService.get(this.TOKEN_KEY)) {
      let token = JSON.parse(this.cookieService.get(this.TOKEN_KEY));
      return token.token;
    } else {
      return undefined;
    }
  }

  public get Token(): any {
    if (this.cookieService.get(this.TOKEN_KEY)) {
      let token = JSON.parse(this.cookieService.get(this.TOKEN_KEY));
      let decodedToken = this.jwtHelperService.decodeToken(token.token);
      return decodedToken;
    } else {
      return undefined;
    }
  }

  public removeToken() {
    this.cookieService.delete(this.TOKEN_KEY);
  }

  public set RefreshToken(refreshToken: any) {
    let now = new Date();

    let refreshToken_ = {
      token: refreshToken,
      createdDate: now,
    };
    this.cookieService.set(
      this.REFRESHTOKEN_KEY,
      JSON.stringify(refreshToken_)
    );
  }

  public get RefreshToken(): any {
    let refreshToken = JSON.parse(
      this.cookieService.get(this.REFRESHTOKEN_KEY)
    );
    let decodedRefreshToken = this.jwtHelperService.decodeToken(
      refreshToken.token
    );
    return decodedRefreshToken;
  }

  public removeRefreshToken() {
    this.cookieService.delete(this.REFRESHTOKEN_KEY);
  }

  public get User(): any {
    if (this.Token) {
      return this.Token.user;
    } else {
      return undefined;
    }
  }

  public get IsAuthenticated(): any {
    if (this.Token) {
      return this.Token.isAuthenticated;
    } else {
      return false;
    }
  }

  public get Favourites(): any {
    if (
      this.cookieService.get(this.FAVOURITES_KEY) &&
      this.cookieService.get(this.FAVOURITES_KEY) != undefined
    ) {
      return JSON.parse(this.cookieService.get(this.FAVOURITES_KEY)!);
    }
    return [];
  }

  public set Favourites(favourites: string[]) {
    this.cookieService.set(this.FAVOURITES_KEY, JSON.stringify(favourites));
  }

  public removeFavourites() {
    this.cookieService.delete(this.FAVOURITES_KEY);
  }

  public isTokenExpired(): any {
    return this.jwtHelperService.isTokenExpired(JSON.stringify(this.pureToken));
  }

  public get ImageUrl(){
    return this.cookieService.get(this.IMAGEURL_KEY)
  }

  public set ImageUrl(value:string){
    this.cookieService.set(this.IMAGEURL_KEY, value)
  }

  public removeImageUrl(){
    this.cookieService.delete(this.IMAGEURL_KEY)
  }

  public get Username(){
    return this.cookieService.get(this.USERNAME_KEY)
  }

  public set Username(value:string){
    this.cookieService.set(this.USERNAME_KEY, value)
  }

  public removeUsername(){
    this.cookieService.delete(this.USERNAME_KEY)
  }
  
  public checkTokenTime() {
    if (this.Token.createdDate != undefined) {
      var createdDate = new Date(this.Token.createdDate);
      var now = new Date();
      var difference = now.getTime() - createdDate.getTime();
      var resultInMinutes = Math.round(difference / 60000);

      return resultInMinutes > 45;
    } else {
      return true;
    }
  }
}
