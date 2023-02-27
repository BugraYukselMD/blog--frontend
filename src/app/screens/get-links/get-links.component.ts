import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Link } from 'src/models/modelLink';
import { LinkRepository } from 'src/repositories/link.repository';
import { AdminService } from 'src/services/admin.service';


@Component({
  selector: 'app-get-links',
  templateUrl: './get-links.component.html',
  styleUrls: ['./get-links.component.css']
})
export class GetLinksComponent implements AfterContentChecked {

  constructor(
    private linkRepo: LinkRepository,
    private adminService: AdminService
    ) { }

  links:Link[] = [];
  linkName:string = '';
  linkUrl:string = '';
  linkImage:string = ''

  ngAfterContentChecked() {
    this.links = this.linkRepo.getLinks()
  }

  delete(linkid:string){
    this.adminService.deleteLink(linkid);
  }

  onSubmit(){
    let link = {
      linkName: this.linkName,
      linkUrl: this.linkUrl,
      linkImage: this.linkImage
    }
    this.adminService.postLink(link)
  }

}
