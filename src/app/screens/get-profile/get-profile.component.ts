import { AfterContentChecked, Component } from '@angular/core';
import { Blog } from 'src/models/modelBlog';
import { User } from 'src/models/modelUser';
import { BlogRepository } from 'src/repositories/blog.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CookieService_ } from 'src/services/cookie.service';

@Component({
  selector: 'app-get-profile',
  templateUrl: './get-profile.component.html',
  styleUrls: ['./get-profile.component.css'],
})
export class GetProfileComponent implements AfterContentChecked {
  constructor(
    private userRepo: UserRepository,
    private blogRepo: BlogRepository,
    private cookieService: CookieService_
  ) {}

  user?: User;
  imgPath?: string;
  updateImage: any;
  image?: File;
  username?: string = '';
  changedUsername?: string = ''
  favs: Blog[] = [];
  directFav: boolean = false

  ngAfterContentChecked() {
    this.user = this.cookieService.User;
    this.username = this.cookieService.Username;

    this.cookieService.Favourites.forEach((item: any) => {
      if(!this.favs?.includes(this.blogRepo.getBlog(item)) && this.blogRepo.getBlog(item)!=undefined){
        this.favs?.push(this.blogRepo.getBlog(item))
      }
    });

    this.imgPath =
      'https://drive.google.com/uc?export=view&id=' +
      this.cookieService.ImageUrl;
  }

  getImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.updateImage = reader.result);
      reader.readAsDataURL(file);

      this.image = file;
    }
  }

  changeDiv(){
    this.directFav = !this.directFav;
  }

  changeUsername(value:any){
    this.changedUsername = value
  }

  logout() {
    this.userRepo.clear();
  }

  updateProfile() {
    if(this.image || (this.username != this.changedUsername && this.changedUsername != '') ){
      if(this.changedUsername == this.username){
        this.changedUsername = this.user?.name
      }
      this.userRepo.updateProfile(this.image, this.changedUsername)
    }
  }

  removeFromFavourites(blogid: any) {
    this.favs = this.favs.filter((item:any)=>{item._id != blogid})
    this.userRepo.removeFromFavourites(blogid)
  }
}
