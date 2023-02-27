import { AfterContentChecked, Component } from '@angular/core';
import { Blog } from 'src/models/modelBlog';
import { BlogRepository } from 'src/repositories/blog.repository';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css'],
  providers:[]
})
export class ListBlogComponent implements AfterContentChecked {

  constructor(
    private blogRepo: BlogRepository
    ) { }

  blogs: Blog[] = [];
  
  ngAfterContentChecked() {
    this.blogs = this.blogRepo.getBlogs()
  }

}
