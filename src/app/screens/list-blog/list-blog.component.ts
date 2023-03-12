import { AfterContentChecked, Component } from '@angular/core';
import { Blog } from 'src/models/modelBlog';
import { Category } from 'src/models/modelCategory';
import { BlogRepository } from 'src/repositories/blog.repository';
import { CategoryRepository } from 'src/repositories/category.repository';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css'],
  providers: [],
})
export class ListBlogComponent implements AfterContentChecked {
  constructor(
    private blogRepo: BlogRepository,
    private catRepo: CategoryRepository
  ) {}

  blogs: Blog[] = [];
  newBlogs: Blog[] = [];
  isClicked: Boolean = false;
  categories: Category[] = [];
  all: string = 'All';
  selectedCategory: string = this.all;
  isChanged: Boolean = false;

  ngAfterContentChecked() {
    this.blogs = this.blogRepo.getBlogs();
    this.categories = this.catRepo.getCategories();
  }

  changeIsClicked() {
    this.isClicked = !this.isClicked;
  }

  changeSelectedCategory(value: any) {
    this.selectedCategory = value;
    if (value == this.all) {
      this.newBlogs = this.blogRepo.getBlogs();
    } else {
      var last: Blog[] = [];
      this.blogRepo.getBlogs().map((blog) => {
        if (blog.categories.includes(value)) {
          last.push(blog)
        }
      });
      this.newBlogs = last.map(blog=>{return blog});
      this.isChanged = true
    }
  }
}
