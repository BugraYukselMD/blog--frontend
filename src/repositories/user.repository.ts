import { Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { BlogRepository } from './blog.repository';
import { AlertifyService } from 'src/services/alertify.service';
import { CookieService_ } from 'src/services/cookie.service';

@Injectable()
export class UserRepository implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private blogRepository: BlogRepository,
    private alertifyService: AlertifyService,
    private cookieService: CookieService_
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.authService.login(email, password).subscribe((data) => {
      this.cookieService.Token = data.token;
      this.cookieService.RefreshToken = data.refreshToken;
      this.cookieService.Favourites = this.cookieService.User.favourites
        ? this.cookieService.User.favourites
        : [];

      this.cookieService.ImageUrl = this.cookieService.User.imageUrl;
      this.cookieService.Username = this.cookieService.User.name;

      this.alertifyService.success('Giriş Başarılı!');

      this.router.navigateByUrl('');
    });
  }

  clear() {
    this.cookieService.removeToken();
    this.cookieService.removeRefreshToken();
    this.cookieService.removeFavourites();
    this.cookieService.removeImageUrl();
    this.cookieService.removeUsername();

    this.alertifyService.warning('Çıkış Yapıldı!');

    this.router.navigateByUrl('/login');
  }

  sendComment(blogid: any, comment: string) {
    this.authService
      .sendComment(blogid, comment, this.cookieService.pureToken)
      .subscribe((data: any) => {
        if (data.success) {
          this.alertifyService.success('Yorumunuz Başarıyla Eklendi!');
          this.blogRepository.addComment(
            blogid,
            comment,
            data.comment,
            data.user
          );
        } else {
          this.alertifyService.error(
            'Yorumunuz Eklenemedi! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  sendReply(blogid: any, commentid: string, reply: string) {
    this.authService
      .sendReply(blogid, commentid, reply, this.cookieService.pureToken)
      .subscribe((data: any) => {
        if (data.success) {
          this.alertifyService.success('Cevabınız Başarıyla Eklendi!');
        } else {
          this.alertifyService.error(
            'Cevabınız Eklenemedi! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  deleteComment(blogid: any, commentid: any) {
    this.authService
      .deleteComment(blogid, commentid, this.cookieService.pureToken)
      .subscribe((data: any) => {
        if (data.success) {
          this.alertifyService.warning('Yorum Silindi!');
          this.blogRepository.deleteComment(blogid, commentid);
        } else {
          this.alertifyService.error(
            'Yorum Silinemedi! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  addToFavourites(blogid: any) {
    this.authService
      .addToFavourites(
        this.cookieService.User._id,
        blogid,
        this.cookieService.pureToken
      )
      .subscribe((data: any) => {
        if (data.success) {
          this.alertifyService.success('Blog Başarıyla Favorilendi!');
          this.cookieService.Favourites = data.favourites
            ? data.favourites
            : this.cookieService.Favourites;
        } else {
          this.alertifyService.error(
            'Favorilere Ekleme Başarısız! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  removeFromFavourites(blogid: any) {
    this.authService
      .removeFromFavourites(
        this.cookieService.User._id,
        blogid,
        this.cookieService.pureToken
      )
      .subscribe((data: any) => {
        if (data.success) {
          this.alertifyService.warning('Blog Favorilerden Çıkarıldı!');
          this.cookieService.Favourites = data.favourites
            ? data.favourites
            : this.cookieService.Favourites;
        } else {
          this.alertifyService.error(
            'Favorilerden Çıkarma Başarısız! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
  }

  updateProfile(image: any, name: any) {
    this.authService.updateProfile(
      this.cookieService.User,
      name,
      image,
      this.cookieService.pureToken
    );
  }

  checkToken() {
    return this.authService.checkToken(this.cookieService.pureToken);
  }
}
