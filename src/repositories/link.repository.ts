import { AfterContentChecked, Injectable } from '@angular/core';
import { Link } from 'src/models/modelLink';
import { RestService } from 'src/services/rest.service';

@Injectable()
export class LinkRepository implements AfterContentChecked {
  private links: Link[] = [];

  constructor(private restService: RestService) {
    this.restService.getLinks().subscribe((links) => (this.links = links));
  }

  ngAfterContentChecked() {}

  getLinks(): any {
    return this.links;
  }

  addLink(link: any) {
    this.links.push(link);
  }

  deleteLink(linkid:any) {
    this.links = this.links.filter((item) => item._id != linkid);
  }
}
