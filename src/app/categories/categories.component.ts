import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: Array<any>;
  formCategory: string;
  formStatus: string = 'Add';
  categoryID: string;
  
  constructor(private categoryServie: CategoriesService) {}

  ngOnInit(): void {
    this.categoryServie.loadData().subscribe( value => {
      this.categoryArray = value;
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      categories: formData.value.categories,
    };
    if(this.formStatus == 'Add'){
      this.categoryServie.saveData(categoryData);
      formData.reset();
    }
    else if(this.formStatus == 'Edit') {
      this.categoryServie.updateData(this.categoryID, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
  }
  onEdit(category, id) {
    this.formCategory = category;
    this.formStatus = 'Edit'
    this.categoryID = id;
  }
  onDelete(id) {
    this.categoryServie.deleteData(id);
  }
}
