import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BlogRepository } from 'src/repositories/blog.repository';
import { CategoryRepository } from 'src/repositories/category.repository';
import { LinkRepository } from 'src/repositories/link.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from 'src/services/auth.service';
import { RestService } from 'src/services/rest.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers:[
    RestService,
    AuthService,
    BlogRepository,
    CategoryRepository,
    LinkRepository,
    UserRepository,
    CookieService
  ],
  declarations: []
})
export class BlogModule { }
