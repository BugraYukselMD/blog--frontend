import { AfterContentChecked, Injectable } from '@angular/core';
import { Category } from 'src/models/modelCategory';
import { RestService } from 'src/services/rest.service';

@Injectable()
export class CategoryRepository implements AfterContentChecked {
  private categories: Category[] = [];

  constructor(private restService: RestService) {
    this.restService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  ngAfterContentChecked() {}

  getCategories(): any {
    return this.categories;
  }

  addCategory(category: any) {
    this.categories.push(category);
  }

  deleteCategory(catid: any) {
    this.categories = this.categories.filter((item) => item._id != catid);
  }
}
