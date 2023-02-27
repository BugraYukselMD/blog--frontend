import { AfterContentChecked, Component } from '@angular/core';
import { Link } from 'src/models/modelLink';
import { LinkRepository } from 'src/repositories/link.repository';

@Component({
  selector: 'app-get-linktree',
  templateUrl: './get-linktree.component.html',
  styleUrls: ['./get-linktree.component.css'],
  providers:[]
})
export class GetLinktreeComponent implements AfterContentChecked {

  constructor(private linkRepo: LinkRepository) { }

  links:Link[] = []
  imgPath = "assets/headicon.jpeg"

  ngAfterContentChecked() {
    this.links = this.linkRepo.getLinks()
  }

}
