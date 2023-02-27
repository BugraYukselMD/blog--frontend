import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GetAboutComponent } from './screens/get-about/get-about.component';
import { GetBlogComponent } from './screens/get-blog/get-blog.component';
import { GetFooterComponent } from './screens/get-footer/get-footer.component';
import { GetLinktreeComponent } from './screens/get-linktree/get-linktree.component';
import { GetNavbarComponent } from './screens/get-navbar/get-navbar.component';
import { ListBlogComponent } from './screens/list-blog/list-blog.component';
import { BlogModule } from 'src/modules/blog/blog.module';
import { GetLoginComponent } from './screens/get-login/get-login.component';
import { GetRegisterComponent } from './screens/get-register/get-register.component';
import { CookieService } from 'ngx-cookie-service';
import { GetProfileComponent } from './screens/get-profile/get-profile.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from 'src/services/authGuard.service';
import { AdminGuardService } from 'src/services/adminGuard.service';
import { TokenValidationService } from 'src/services/tokenValidation.service';
import { AlertifyService } from 'src/services/alertify.service';
import { CookieService_ } from 'src/services/cookie.service';

@NgModule({
    declarations: [
        AppComponent,
        ListBlogComponent,
        GetLinktreeComponent,
        GetAboutComponent,
        GetBlogComponent,
        GetNavbarComponent,
        GetFooterComponent,
        GetLoginComponent,
        GetRegisterComponent,
        GetProfileComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CookieService,
        JwtHelperService,
        AuthGuardService,
        AdminGuardService,
        TokenValidationService,
        AlertifyService,
        CookieService_
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BlogModule,
        AngularEditorModule
    ]
})
export class AppModule { }
