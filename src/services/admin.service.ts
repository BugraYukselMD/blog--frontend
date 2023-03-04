import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BlogRepository } from 'src/repositories/blog.repository';
import { LinkRepository } from 'src/repositories/link.repository';
import { CategoryRepository } from 'src/repositories/category.repository';
import { AlertifyService } from './alertify.service';
import { CookieService_ } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService_,
    private blogRepo: BlogRepository,
    private linkRepo: LinkRepository,
    private categoryRepo: CategoryRepository,
    private alertifyService: AlertifyService
  ) {}

  path: string = 'https://blog--backend.herokuapp.com/api/v1/admin';
  saveImageUrl: string = this.path + '/save-blog-cover-image';
  addBlogUrl: string = this.path + '/add-blog';
  editBlogUrl: string = this.path + '/edit-blog';
  deleteBlogUrl: string = this.path + '/delete-blog';
  addLinkUrl: string = this.path + '/add-link';
  deleteLinkUrl: string = this.path + '/delete-link';
  addCategoryUrl: string = this.path + '/add-category';
  deleteCategoryUrl: string = this.path + '/delete-category';

  httpOptions: HttpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer<' + this.cookieService.pureToken + '>');

  headers = { headers: this.httpOptions };

  postBlogRemnant(blog: any) {
    return this.http
      .post<any>(this.addBlogUrl, blog, this.headers)
      .pipe(tap(), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) {
          this.blogRepo.addBlog(data.blog);
          this.alertifyService.success('Blog Başarıyla Eklendi!');
        } else {
          this.alertifyService.error(
            'Bir Hata Oluştu! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  postBlog(blog: any, image: File): any {
    if (image) {
      var formData = new FormData();
      formData.append('image', image, image.name);
      this.http
        .post<any>(this.saveImageUrl, formData, this.headers)
        .pipe(tap(), catchError(this.handleError))
        .subscribe((data) => {
          blog.coverImg = data.id;
          this.postBlogRemnant(blog);
        });
    } else {
      blog.coverImg = undefined;
      this.postBlogRemnant(blog);
    }
  }

  editBlogRemnant(blog: any): any {
    this.http
      .post<any>(this.editBlogUrl, blog, this.headers)
      .pipe(tap(), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) {
          this.blogRepo.editBlog(data.blog);
          this.alertifyService.success('Blog Başarıyla Güncellendi!');
        } else {
          this.alertifyService.error(
            'Bir Hata Oluştu! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  editBlog(blog: any, image: File): any {
    if (image) {
      var formData = new FormData();
      formData.append('image', image, image.name);
      this.http
        .post<any>(this.saveImageUrl, formData, this.headers)
        .pipe(tap(), catchError(this.handleError))
        .subscribe((data) => {
          blog.coverImg = data.id;
          this.editBlogRemnant(blog);
        });
    } else {
      this.editBlogRemnant(blog);
    }
  }

  deleteBlog(blogid: any): any {
    this.http
      .post<any>(this.deleteBlogUrl, { blogid: blogid }, this.headers)
      .pipe(tap(), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) {
          this.blogRepo.deleteBlog(blogid);
          this.alertifyService.warning('Blog Silindi!');
        } else {
          this.alertifyService.error(
            'Bir Hata Oluştu! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  postLink(link: any): any {
    this.http
      .post<any>(this.addLinkUrl, link, this.headers)
      .pipe(tap(), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) {
          this.linkRepo.addLink(data.link);
          this.alertifyService.success('Link Başarıyla Eklendi!');
        } else {
          this.alertifyService.error(
            'Bir Hata Oluştu! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  deleteLink(linkid: any): any {
    this.http
      .post<any>(this.deleteLinkUrl, { linkid: linkid }, this.headers)
      .pipe(tap(), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) {
          this.linkRepo.deleteLink(linkid);
          this.alertifyService.warning('Link Silindi!');
        } else {
          this.alertifyService.error(
            'Bir Hata Oluştu! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  postCategory(category: any): any {
    this.http
      .post<any>(this.addCategoryUrl, category, this.headers)
      .pipe(tap(), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) {
          this.categoryRepo.addCategory(data.category);
          this.alertifyService.success('Kategori Başarıyla Eklendi!');
        } else {
          this.alertifyService.error(
            'Bir Hata Oluştu! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  deleteCategory(catid: any): any {
    this.http
      .post<any>(this.deleteCategoryUrl, { categoryid: catid }, this.headers)
      .pipe(tap(), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) {
          this.categoryRepo.deleteCategory(catid);
          this.alertifyService.warning('Kategori Silindi!');
        } else {
          this.alertifyService.error(
            'Bir Hata Oluştu! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Bir hata oluştu: ' + err.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata!';
    }
    return throwError(errorMessage);
  }
}
