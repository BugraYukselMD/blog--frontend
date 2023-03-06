import { AfterContentChecked, Component } from '@angular/core';
import { CookieService_ } from 'src/services/cookie.service';
import { Blog } from 'src/models/modelBlog';
import { BlogRepository } from 'src/repositories/blog.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterContentChecked {
  title = 'blog--frontend';
  blogs:Blog[] = [];

  constructor(
    private cookieService: CookieService_ ,
    private blogRepo: BlogRepository
  ) {}

  ngAfterContentChecked(): void {
    this.blogs = this.blogRepo.getBlogs();
    var token = this.cookieService.pureToken;
    if (token) {
      if (this.cookieService.isTokenExpired()) {
        this.cookieService.removeToken();
      }
    }
  }
}
