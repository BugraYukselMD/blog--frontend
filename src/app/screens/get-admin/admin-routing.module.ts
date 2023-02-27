import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetAdminComponent } from './get-admin.component';
import { GetBlogsComponent } from '../get-blogs/get-blogs.component';
import { GetLinksComponent } from '../get-links/get-links.component';
import { GetAddBlogComponent } from '../get-add-blog/get-add-blog.component';
import { GetCategoriesComponent } from '../get-categories/get-categories.component';
import { GetEditBlogComponent } from '../get-edit-blog/get-edit-blog.component';

const routes: Routes = [
  { path: '', component: GetAdminComponent, canActivate: [], children: [
    { path: 'blogs', component:GetBlogsComponent},
    { path: 'links', component:GetLinksComponent},
    { path: 'categories', component:GetCategoriesComponent},
    { path: 'add-blog', component:GetAddBlogComponent},
    { path: 'edit-blog/:blogid', component: GetEditBlogComponent}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }