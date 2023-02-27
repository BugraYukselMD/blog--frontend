import { AfterContentChecked, Component } from '@angular/core';
import { Category } from 'src/models/modelCategory';
import { CategoryRepository } from 'src/repositories/category.repository';
import { AdminService } from 'src/services/admin.service';


@Component({
  selector: 'app-get-add-blog',
  templateUrl: './get-add-blog.component.html',
  styleUrls: ['./get-add-blog.component.css'],
})
export class GetAddBlogComponent implements AfterContentChecked {
  constructor(
    private categoryRepo: CategoryRepository,
    private adminService: AdminService
    ) {}

  categories: Category[] = [];
  checkedCategories?:string[] = [];
  readMin: number = 5;
  body?:any;
  image!:File;
  imgSrc?:any;
  title?:string;

  ngAfterContentChecked() {
    this.categories = this.categoryRepo.getCategories()
  }

  changeTitle(value:any){
    this.title = value;
  }

  changeReadMin(value:any){
    this.readMin = parseInt(value)
  }

  checkCategory(value:any){
    if(this.checkedCategories?.includes(value)){
      this.checkedCategories = this.checkedCategories.filter(item=>item!=value);
    }else{
      this.checkedCategories?.push(value)
    }
  }

  getBody(value:any){
    this.body = value;
  }

  getImage(event:any){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(file)

      this.image = file;
    }
  }

  onSubmit(){
    var blog = {
      title: this.title,
      readMin: this.readMin,
      categories: this.checkedCategories,
      body: this.body
    }

    this.adminService.postBlog(blog, this.image)

  }
}
