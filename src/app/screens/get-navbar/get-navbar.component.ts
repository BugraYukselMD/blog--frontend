import { AfterContentChecked, Component } from '@angular/core';
import { CookieService_ } from 'src/services/cookie.service';

@Component({
  selector: 'app-get-navbar',
  templateUrl: './get-navbar.component.html',
  styleUrls: ['./get-navbar.component.css'],
})
export class GetNavbarComponent implements AfterContentChecked {
  constructor(private cookieService: CookieService_) {}

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  imgPath?: string;
  profilePath?: string;

  ngAfterContentChecked() {
    if (this.cookieService.IsAuthenticated == true) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

    if (this.cookieService.User) {
      let user;
      user = this.cookieService.User;
      this.imgPath =
        'https://drive.google.com/uc?export=view&id=' + this.cookieService.ImageUrl;
      this.profilePath = '/user/' + user._id;
      this.isAdmin = user.isAdmin;
    } else {
      this.isAdmin = false;
    }
  }
}
