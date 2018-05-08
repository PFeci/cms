import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {CategoryService} from '../../category/category.service';
import {CategoryDTO} from '../../../../../src/dtos/category-dto';
import * as _ from 'lodash';
import {UsersService} from '../../users/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.scss']
})
export class SettingListComponent implements OnInit {

  user: UserDTO = <UserDTO>{};
  firstName: string;
  lastName: string;
  categories: CategoryDTO[] = [];

  constructor(private authService: AuthService, private categoryService: CategoryService, private usersService: UsersService) {
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
    this.usersService.updateUser(this.user).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    )

  }

}
