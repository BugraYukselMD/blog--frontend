import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-about',
  templateUrl: './get-about.component.html',
  styleUrls: ['./get-about.component.css']
})
export class GetAboutComponent implements OnInit {

  constructor() { }

  imgPath = "assets/headicon.jpeg"

  ngOnInit() {
  }

}
