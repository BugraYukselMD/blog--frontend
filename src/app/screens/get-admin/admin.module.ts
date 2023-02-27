import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetAddBlogComponent } from '../get-add-blog/get-add-blog.component';
import { GetBlogsComponent } from '../get-blogs/get-blogs.component';
import { GetCategoriesComponent } from '../get-categories/get-categories.component';
import { GetLinksComponent } from '../get-links/get-links.component';
import { AdminRoutingModule } from './admin-routing.module';
import { GetAdminComponent } from './get-admin.component';
import { AngularEditorComponent } from 'src/app/angular-editor/angular-editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GetEditBlogComponent } from '../get-edit-blog/get-edit-blog.component';

@NgModule({
    declarations: [
        GetAddBlogComponent,
        GetEditBlogComponent,
        GetBlogsComponent,
        GetCategoriesComponent,
        GetLinksComponent,
        AngularEditorComponent,
        GetAdminComponent
    ],
    providers: [],
    bootstrap: [GetAdminComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        AngularEditorModule
    ]
})
export class AdminModule { }