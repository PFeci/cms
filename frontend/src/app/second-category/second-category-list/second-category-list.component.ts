import { Component, OnInit } from '@angular/core';
import {SecondCategoryDTO} from '../../../../../src/dtos/second-category-dto';
import {SecondCategoryService} from '../second-category.service';

@Component({
  selector: 'app-second-category-list',
  templateUrl: './second-category-list.component.html',
  styleUrls: ['./second-category-list.component.scss']
})
export class SecondCategoryListComponent implements OnInit {

  secondCategories: SecondCategoryDTO[];
  newSecondCategory: SecondCategoryDTO;

  constructor(private secondCategoryService: SecondCategoryService) { }

  ngOnInit() {
    this.getSecondCategories();
  }

  getSecondCategories() {
    this.secondCategoryService.getSecondCategories().subscribe(
      resp => this.secondCategories = resp,
      err => console.log(err)
    );
  }

  deleteSecondCategory(scategory: SecondCategoryDTO) {
    this.secondCategoryService.deleteSecondCategory(scategory).subscribe(
      resp => this.getSecondCategories(),
      err => console.log(err)
    );
  }

  updateSecondCategory(scategory: SecondCategoryDTO) {
    this.secondCategoryService.updateSecondCategory(scategory).subscribe(
      resp => scategory['edit'] = false,
      err => console.log(err)
    );
  }

  createNewSecondCategory() {
    this.newSecondCategory = <SecondCategoryDTO> {};
  }

  deleteNewSecondCategory() {
    this.newSecondCategory = null;
  }

  saveNewSecondCategory() {
    this.secondCategoryService.createSecondCategory(this.newSecondCategory).subscribe(
      resp => {
        this.newSecondCategory= null;
        this.getSecondCategories();
      },
      err => console.log(err)
    );
  }

}
