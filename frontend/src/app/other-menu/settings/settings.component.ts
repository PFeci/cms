import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {CategoryService} from '../../admin-menu/category.service';
import {CategoryDTO} from '../../../../../src/dtos/category-dto';
import * as _ from 'lodash';
import {OtherMenuService} from '../other-menu.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: UserDTO = <UserDTO>{};
  firstName: string;
  lastName: string;
  categories: CategoryDTO[] = [];

  constructor(private authService: AuthService, private categoryService: CategoryService, private otherService: OtherMenuService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(
      resp => this.user = resp,
      err => console.log(err)
    );
    this.categoryService.getCategories().subscribe(
      resp => this.categories = resp,
      err => console.log(err)
    );
  }

  isInterestedCategory(category: CategoryDTO) {
    let result = _.findIndex(this.user.interestedCategories, category);
    return result !== -1;
  }

  addInterestedCategory(category: CategoryDTO) {
    if (_.findIndex(this.user.interestedCategories, category) === -1) {
      this.user.interestedCategories ? '' : this.user.interestedCategories = [];
      this.user.interestedCategories.push(category);
    } else {
      _.remove(this.user.interestedCategories, {id: category.id});
    }
  }

  updateUser(){
    this.otherService.updateUser(this.user).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    )

  }

}
