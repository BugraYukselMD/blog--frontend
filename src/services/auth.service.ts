import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { CookieService_ } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private cookieService: CookieService_
  ) {}

  path: string = 'api/v1';
  loginUrl: string = this.path + '/login';
  registerUrl: string = this.path + '/register';
  sendCommentUrl: string = this.path + '/send-comment';
  sendReplyUrl: string = this.path + '/send-reply';
  deleteCommentUrl: string = this.path + '/delete-comment';
  addFavUrl: string = this.path + '/add-favourite';
  removeFavUrl: string = this.path + '/remove-favourite';
  checkTokenUrl: string = this.path + '/check-token';
  saveImageUrl: string = this.path + '/save-user-image';
  updateProfileUrl: string = this.path + '/edit-profile';

  DEFAULT_IMAGE_ID: string = '1QCcp8bV5wvuTawCRMmjwPMGn-vAvqpBY';

  httpOptions: HttpHeaders = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Accept', 'application/json');

  headers = { headers: this.httpOptions };

  login(email: string, password: string) {
    return this.http
      .post<any>(
        this.loginUrl,
        { email: email, password: this.Encrypt(password) },
        this.headers
      )
      .pipe(tap(), catchError(this.handleError));
  }

  registerRemnant(user: any) {
    this.http
      .post<any>(this.registerUrl, user, this.headers)
      .pipe(tap(), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) console.log('Registered!');
      });
  }

  register(user: any, image: any) {
    if (image) {
      var formData = new FormData();
      formData.append('image', image, image.name);
      this.http
        .post<any>(this.saveImageUrl, formData, this.headers)
        .pipe(tap(), catchError(this.handleError))
        .subscribe((data) => {
          user.imageUrl = data.id;
          this.registerRemnant(user);
        });
    } else {
      user.imageUrl = this.DEFAULT_IMAGE_ID;
      this.registerRemnant(user);
    }

    this.router.navigateByUrl('');
  }

  sendComment(blogid: any, comment: string, token: any) {
    let httpOptions: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer<' + token + '>');
    let headers = { headers: httpOptions };

    return this.http
      .post<any>(
        this.sendCommentUrl,
        {
          blogid: blogid,
          comment: comment,
        },
        headers
      )
      .pipe(tap(), catchError(this.handleError));
  }

  sendReply(blogid: any, commentid: string, reply: string, token: any) {
    let httpOptions: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer<' + token + '>');
    let headers = { headers: httpOptions };

    return this.http
      .post<any>(
        this.sendReplyUrl,
        {
          blogid: blogid,
          commentid: commentid,
          reply: reply,
        },
        headers
      )
      .pipe(tap(), catchError(this.handleError));
  }

  deleteComment(blogid: any, commentid: any, token: any) {
    let httpOptions: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer<' + token + '>');
    let headers = { headers: httpOptions };

    return this.http
      .post<any>(
        this.deleteCommentUrl,
        {
          blogid: blogid,
          commentid: commentid,
        },
        headers
      )
      .pipe(tap(), catchError(this.handleError));
  }

  addToFavourites(userid: any, blogid: any, token: any) {
    let httpOptions: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer<' + token + '>');
    let headers = { headers: httpOptions };

    return this.http
      .post<any>(
        this.addFavUrl,
        {
          userid: userid,
          blogid: blogid,
        },
        headers
      )
      .pipe(tap(), catchError(this.handleError));
  }

  removeFromFavourites(userid: any, blogid: any, token: any) {
    let httpOptions: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer<' + token + '>');
    let headers = { headers: httpOptions };

    return this.http
      .post<any>(
        this.removeFavUrl,
        {
          userid: userid,
          blogid: blogid,
        },
        headers
      )
      .pipe(tap(), catchError(this.handleError));
  }

  updateProfileRemnant(
    user: any,
    name: any,
    imageUrl: any,
    oldImageUrl: any,
    headers: any
  ) {
    return this.http
      .post(
        this.updateProfileUrl,
        {
          userid: user._id,
          name: name,
          oldImageUrl: oldImageUrl,
          imageUrl: imageUrl,
        },
        headers
      )
      .pipe(tap(), catchError(this.handleError));
  }

  updateProfile(user: any, name: any, image: any, token: any) {
    let httpOptions: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer<' + token + '>');
    let headers = { headers: httpOptions };

    if (image) {
      var formData = new FormData();
      formData.append('image', image, image.name);

      this.http
        .post<any>(this.saveImageUrl, formData, headers)
        .pipe(tap(), catchError(this.handleError))
        .subscribe((data) => {
          this.updateProfileRemnant(
            user,
            name,
            data.id,
            user.imageUrl,
            headers
          ).subscribe((data: any) => {
            if (data.success) {
              this.alertifyService.success(
                'Profiliniz Güncellendi!'
              );
              this.cookieService.ImageUrl = data.imageUrl;
              this.cookieService.Username = data.name;
              
            } else {
              this.alertifyService.error(
                'Profil Güncelleme Başarısız! Daha Sonra Tekrar Deneyiniz!'
              );
            }
          });
        });
    } else {
      this.updateProfileRemnant(
        user,
        name,
        user.imageUrl,
        user.imageUrl,
        headers
      ).subscribe((data: any) => {
        if (data.success) {
          this.alertifyService.success(
            'Profiliniz Güncellendi!'
          );
          this.cookieService.Username = data.name;
          
        } else {
          this.alertifyService.error(
            'Profil Güncelleme Başarısız! Daha Sonra Tekrar Deneyiniz!'
          );
        }
      });
    }
  }

  checkToken(token: any) {
    let httpOptions: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer<' + token + '>');
    let headers = { headers: httpOptions };

    return this.http
      .get(this.checkTokenUrl, headers)
      .pipe(tap(), catchError(this.handleError));
  }

  public Encrypt(password: string) {
    let keyStr: string =
      'ABCDEFGHIJKLMNOP' +
      'QRSTUVWXYZabcdef' +
      'ghijklmnopqrstuv' +
      'wxyz0123456789+/' +
      '=';

    password = password.split('+').join('|');
    let input = encodeURI(password);
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
      chr1 = chr2 = chr3 = '';
      enc1 = enc2 = enc3 = enc4 = '';
    } while (i < input.length);
    return output;
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
