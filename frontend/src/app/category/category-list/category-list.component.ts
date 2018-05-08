import {Component, OnInit} from '@angular/core';
import {CategoryDTO} from '../../../../../src/dtos/category-dto';
import {CategoryService} from '../category.service';
import {mergeResolvedReflectiveProviders} from '@angular/core/src/di/reflective_provider';

@Component({
  selector: 'app-content',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: CategoryDTO[] = [];
  newCategory: CategoryDTO;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      resp => this.categories = resp,
      err => console.log(err)
    );
  }

  deleteCategory(category: CategoryDTO) {
    this.categoryService.deleteCategory(category).subscribe(
      resp => this.getCategories(),
      err => console.log(err)
    );
  }

  updateCategory(category: CategoryDTO) {
    this.categoryService.updateCategory(category).subscribe(
      resp => category['edit'] = false,
      err => console.log(err)
    );
  }

  createNewCategory() {
    this.newCategory = <CategoryDTO> {};
  }

  deleteNewCategory() {
    this.newCategory = null;
  }

  saveNewCategory() {
    this.categoryService.createCategory(this.newCategory).subscribe(
      resp => {
        this.newCategory = null;
        this.getCategories();
      },
      err => console.log(err)
    );
  }

}
