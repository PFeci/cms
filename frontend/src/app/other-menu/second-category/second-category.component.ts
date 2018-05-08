import { Component, OnInit } from '@angular/core';
import {CategoryDTO} from '../../../../../src/dtos/category-dto';
import {OtherMenuService} from '../other-menu.service';
import {SecondCategoryDTO} from '../../../../../src/dtos/second-category-dto';

@Component({
  selector: 'app-second-category',
  templateUrl: './second-category.component.html',
  styleUrls: ['./second-category.component.scss']
})
export class SecondCategoryComponent implements OnInit {

  secondCategories: SecondCategoryDTO[];
  newSecondCategory: SecondCategoryDTO;

  constructor(private otherService: OtherMenuService) { }

  ngOnInit() {
    this.getSecondCategories();
  }

  getSecondCategories() {
    this.otherService.getSecondCategories().subscribe(
      resp => this.secondCategories = resp,
      err => console.log(err)
    );
  }

  deleteSecondCategory(scategory: SecondCategoryDTO) {
    this.otherService.deleteSecondCategory(scategory).subscribe(
      resp => this.getSecondCategories(),
      err => console.log(err)
    );
  }

  updateSecondCategory(scategory: SecondCategoryDTO) {
    this.otherService.updateSecondCategory(scategory).subscribe(
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
    this.otherService.createSecondCategory(this.newSecondCategory).subscribe(
      resp => {
        this.newSecondCategory= null;
        this.getSecondCategories();
      },
      err => console.log(err)
    );
  }

}
