import { AfterContentChecked, Component } from '@angular/core';
import { CookieService_ } from 'src/services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterContentChecked {
  title = 'blog--frontend';

  constructor(private cookieService: CookieService_) {}

  ngAfterContentChecked(): void {
    var token = this.cookieService.pureToken;
    if (token) {
      if (this.cookieService.isTokenExpired()) {
        this.cookieService.removeToken();
      }
    }
  }
}
