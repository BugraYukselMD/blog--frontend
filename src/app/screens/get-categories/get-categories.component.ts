import { AfterContentChecked, Component } from '@angular/core';
import { Category } from 'src/models/modelCategory';
import { CategoryRepository } from 'src/repositories/category.repository';
import { AdminService } from 'src/services/admin.service';


@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.css']
})
export class GetCategoriesComponent implements AfterContentChecked {

  constructor(
    private categoryRepo: CategoryRepository,
    private adminService: AdminService
    ) { }

  categories:Category[] = [];
  categoryName:string = ''

  ngAfterContentChecked() {
    this.categories = this.categoryRepo.getCategories()
  }

  delete(catid:string){
    this.adminService.deleteCategory(catid)
  }
  
  onSubmit(){
    let category = {
      categoryName: this.categoryName
    }
    this.adminService.postCategory(category)
  }

}
