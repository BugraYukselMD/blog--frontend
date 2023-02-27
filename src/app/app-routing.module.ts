import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListBlogComponent } from './screens/list-blog/list-blog.component';
import { GetBlogComponent } from './screens/get-blog/get-blog.component';
import { GetLinktreeComponent } from './screens/get-linktree/get-linktree.component';
import { GetLoginComponent } from './screens/get-login/get-login.component';
import { GetRegisterComponent } from './screens/get-register/get-register.component';
import { GetProfileComponent } from './screens/get-profile/get-profile.component';
import { AuthGuardService } from 'src/services/authGuard.service';
import { AdminGuardService } from 'src/services/adminGuard.service';
import { TokenValidationService } from 'src/services/tokenValidation.service';

const routes: Routes = [
  { path: '', component: ListBlogComponent, canActivate:[TokenValidationService]},
  { path: 'blog/:blogid', component: GetBlogComponent, canActivate:[TokenValidationService]},
  { path: 'linktree', component: GetLinktreeComponent, canActivate:[TokenValidationService]},
  { path: 'login', component: GetLoginComponent, canActivate:[TokenValidationService, AuthGuardService]},
  { path: 'register', component: GetRegisterComponent, canActivate:[TokenValidationService, AuthGuardService]},
  { path: 'user/:userid', component: GetProfileComponent, canActivate:[TokenValidationService ,AuthGuardService]},
  { path: 'admin', loadChildren: ()=> import("./screens/get-admin/admin.module").then(mod=>mod.AdminModule), canActivate:[TokenValidationService, AdminGuardService]},
  { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '**', component: ListBlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
