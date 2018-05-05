import {Component, OnInit} from '@angular/core';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {UserListService} from '../user-list.service';
import {Role} from '../../../../../src/enums/role';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserDTO [] = [];
  roles = Role;

  constructor(private userService: UserListService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      resp => this.users = resp['body'],
      err => console.log(err)
    );
  }

  updateUser(user){
    this.userService.changeRole(user).subscribe(
      resp => user.edit = false,
      err => console.log(err)
    );
  }

  deleteUser(user){
    this.userService.deleteUser(user).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    )
  }
}
