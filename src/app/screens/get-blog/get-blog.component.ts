import { AfterContentChecked, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/models/modelBlog';
import { BlogRepository } from 'src/repositories/blog.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CookieService_ } from 'src/services/cookie.service';

@Component({
  selector: 'app-get-blog',
  templateUrl: './get-blog.component.html',
  styleUrls: ['./get-blog.component.css'],
  providers: [],
})
export class GetBlogComponent implements AfterContentChecked {
  constructor(
    private blogRepo: BlogRepository,
    private userRepo: UserRepository,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService_
  ) {}

  blog?: Blog;

  imgPath: string = 'https://drive.google.com/uc?export=view&id=';
  isAuthenticated?: boolean;
  isFav: boolean = false;
  comment: string = '';
  reply: string = '';
  selectedComment: any;
  selectOptions = {
    reply: 'REPLY',
    comment: 'COMMENT',
  };
  user: any;

  selectedRow: any = this.selectOptions.comment;
  isCommentToggled: boolean = true;
  isReplyToggled: boolean = false;

  placeholderComment = 'Yorum yaz...';
  placeholderReply = 'Yanıtla...';

  ngAfterContentChecked() {
    this.activatedRoute.params.subscribe((params) => {
      this.blog = this.blogRepo.getBlog(params['blogid']);
    });

    if (this.cookieService.IsAuthenticated) {
      this.isAuthenticated = this.cookieService.IsAuthenticated;
      (this.user = this.cookieService.User),
        (this.isFav = this.cookieService.Favourites.includes(this.blog?._id));
    }
  }

  radioChange(commentid: any) {
    this.selectedComment = commentid;
    this.reply = '';
  }

  changeRow(value: any) {
    this.selectedRow = value;
    if (this.selectOptions.comment == value) {
      this.isCommentToggled = true;
      this.isReplyToggled = false;
    } else {
      this.isCommentToggled = false;
      this.isReplyToggled = true;
    }
  }

  sendComment() {
    this.userRepo.sendComment(this.blog?._id, this.comment);
    this.comment = ''
  }

  sendReply() {
    this.userRepo.sendReply(this.blog?._id, this.selectedComment, this.reply);
  }

  deleteComment(commentid: any) {
    this.userRepo.deleteComment(this.blog?._id, commentid);
  }

  addToFavourites() {
    this.userRepo.addToFavourites(this.blog?._id);
  }

  removeFromFavourites() {
    this.userRepo.removeFromFavourites(this.blog?._id);
  }
}
