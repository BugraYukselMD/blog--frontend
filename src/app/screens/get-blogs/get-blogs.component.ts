import { AfterContentChecked, Component, EventEmitter, Output } from '@angular/core';
import { Blog } from 'src/models/modelBlog';
import { BlogRepository } from 'src/repositories/blog.repository';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-get-blogs',
  templateUrl: './get-blogs.component.html',
  styleUrls: ['./get-blogs.component.css']
})
export class GetBlogsComponent implements AfterContentChecked {

  constructor(
    private blogRepo: BlogRepository,
    private adminService: AdminService
    ) { }

  blogs: Blog[] = [];
  @Output() editEvent = new EventEmitter<object>();
  
  ngAfterContentChecked() {
    this.blogs = this.blogRepo.getBlogs()
  }

  delete(blogid:string){
    this.adminService.deleteBlog(blogid)
  }

  edit(blogid:string){
    this.editEvent.emit({isEdit: true, blogid:blogid})
  }

}
