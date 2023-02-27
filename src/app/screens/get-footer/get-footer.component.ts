import { AfterContentChecked, Component } from '@angular/core';
import { Link } from 'src/models/modelLink';
import { LinkRepository } from 'src/repositories/link.repository';


@Component({
  selector: 'app-get-footer',
  templateUrl: './get-footer.component.html',
  styleUrls: ['./get-footer.component.css'],
  providers:[]
})
export class GetFooterComponent implements AfterContentChecked {

  constructor(private linkRepo: LinkRepository) { }

  links:Link[] = [];

  ngAfterContentChecked() {
    this.links = this.linkRepo.getLinks();
  }

}
