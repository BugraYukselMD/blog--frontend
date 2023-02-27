import { AfterContentChecked, Component } from '@angular/core';
import { Category } from 'src/models/modelCategory';
import { BlogRepository } from 'src/repositories/blog.repository';
import { CategoryRepository } from 'src/repositories/category.repository';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-get-edit-blog',
  templateUrl: './get-edit-blog.component.html',
  styleUrls: ['./get-edit-blog.component.css'],
  providers:[]
})
export class GetEditBlogComponent implements AfterContentChecked {

  constructor(
    private blogRepo: BlogRepository,
    private categoryRepo: CategoryRepository,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
    ) {}

  categories: Category[] = [];
  checkedCategories?:string[] = [];
  initCheckedCategories?:string[] = [];
  blog:any;
  editMin: any;
  newEditMin: number | undefined = 0;
  title: string | undefined;
  body?:any;
  isNotChecked:boolean = true;
  imgSrc:any;
  newImgSrc:any;
  image!:File;


  ngAfterContentChecked() {
    this.blog = this.blogRepo.getBlog(this.activatedRoute.snapshot.params["blogid"])
    this.categories = this.categoryRepo.getCategories();
    this.title = this.blog?.title;
    this.editMin = this.blog?.readMin;
    this.imgSrc = this.blog?.coverImg;
    this.blog?.categories.forEach((item:string) => {
      if(!this.initCheckedCategories?.includes(item)){
        this.initCheckedCategories?.push(item)
      }
    });

  }

  changeReadMin(value:any){
    this.newEditMin = parseInt(value)
  }

  changeTitle(value:any){
    this.title = value
  }

  checkCategory(value:any){
    if(this.isNotChecked){
      this.initCheckedCategories?.forEach((item:string)=>{
        this.checkedCategories?.push(item)
      })
    }

    this.isNotChecked = false;

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
      reader.onload = e => this.newImgSrc = reader.result;
      reader.readAsDataURL(file)
      
      this.image = file;
    }
  }

  onSubmit(){
    var blog = {
      _id: this.blog?._id,
      title: this.title,
      readMin: this.newEditMin,
      coverImg: this.blog.coverImg,
      categories: this.checkedCategories,
      body: this.body
    }
    this.adminService.editBlog(blog, this.image);

  }
}
