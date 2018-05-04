import { Component, OnInit } from '@angular/core';
import {CategoryDTO} from '../../../../../src/dtos/category-dto';
import {CategoryService} from '../category.service';
import {mergeResolvedReflectiveProviders} from '@angular/core/src/di/reflective_provider';

@Component({
  selector: 'app-content',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: CategoryDTO[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      resp => this.categories = resp['body'],
      err => console.log(err)
    )
  }

  deleteCategory(category: CategoryDTO) {
    this.categoryService.deleteCategory(category).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    )
  }

  updateCategory(category: CategoryDTO) {
    this.categoryService.updateCategory(category).subscribe(
      resp=> category['edit'] = false,
      err => console.log(err)
    )
  }

}
