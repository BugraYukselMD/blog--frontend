import { AfterContentChecked, Injectable, OnInit } from '@angular/core';
import { Blog } from 'src/models/modelBlog';
import { RestService } from 'src/services/rest.service';

@Injectable()
export class BlogRepository implements AfterContentChecked {
  private blogs: Blog[] = [];

  constructor(
    private restService: RestService
    ) {
    this.restService.getBlogs().subscribe((blogs) => (this.blogs = blogs));
  }

  ngAfterContentChecked() {}

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlog(id: String): any {
    return this.blogs.find((i:any) => i._id == id);
  }

  addBlog(blog:any) {
    this.blogs.push(blog)
  }

  editBlog(blog:any){
    let index = this.blogs.findIndex(item=>(item?._id == blog?._id))
    this.blogs[index] = blog;
  }

  deleteBlog(blogid:any){
    this.blogs = this.blogs.filter(item => item._id != blogid);
  }

  addComment(blogid:any, comment:any, returnedComment:any, user:any){
    let index = this.blogs.findIndex((item:any)=>(item?._id == blogid))
    let blog = this.blogs[index]
    let comments = blog.comments
    returnedComment.user = user

    comments.push(returnedComment)
    blog.comments = comments
    this.blogs[index] = blog
  }

  deleteComment(blogid:any, commentid:any){
    let index = this.blogs.findIndex((item:any)=>(item?._id == blogid))
    let blog = this.blogs[index]
    let comments = blog.comments

    comments = comments.filter((item:any)=> item._id != commentid)
    blog.comments = comments
    this.blogs[index] = blog
  }

}
