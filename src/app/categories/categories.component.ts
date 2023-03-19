import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categoryServie: CategoriesService) {}

  ngOnInit(): void {}

  onSubmit(formData: any) {
    let categoryData: Category = {
      categoryName: formData.value.categories,
    };
    this.categoryServie.saveData(categoryData);
  }
}
