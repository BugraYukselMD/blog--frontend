import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Blog } from 'src/models/modelBlog';
import { Link } from 'src/models/modelLink';
import { Category } from 'src/models/modelCategory';

@Injectable({
  providedIn: 'root'
})
export class RestService {

constructor(private http: HttpClient) { }

path:string = "http://blog--backend.herokuapp.com/api/v1";
blogsUrl:string = this.path + "/blogs";
blogUrl:string = this.path + "/blog/";
linktreeUrl:string = this.path+ "/linktree";
categoriesUrl:string = this.path+ "/categories";

httpOptions: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')

headers = {headers: this.httpOptions}

getBlogs():Observable<Blog[]>{
  return this.http.get<Blog[]>(this.blogsUrl, this.headers).pipe(
    tap(),
    catchError(this.handleError)
  );
}

getLinks():Observable<Link[]>{
  return this.http.get<Link[]>(this.linktreeUrl, this.headers).pipe(
    tap(),
    catchError(this.handleError)
  );
}

getCategories():Observable<Category[]>{
  return this.http.get<Category[]>(this.categoriesUrl, this.headers).pipe(
    tap(),
    catchError(this.handleError)
  );
}

handleError(err:HttpErrorResponse){
  let errorMessage = "";
  if(err.error instanceof ErrorEvent){
    errorMessage = "Bir hata oluştu: " + err.error.message;
  }else{
    errorMessage = "Sistemsel bir hata!"
  }
  return throwError(errorMessage);
}


}
