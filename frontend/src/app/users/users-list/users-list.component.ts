import {Component, OnInit} from '@angular/core';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {Role} from '../../../../../src/enums/role';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: UserDTO [] = [];
  roles = Role;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.usersService.getUsers().subscribe(
      resp => this.users = resp,
      err => console.log(err)
    );
  }

  updateUser(user){
    this.usersService.changeRole(user).subscribe(
      resp => user.edit = false,
      err => console.log(err)
    );
  }

  deleteUser(user){
    this.usersService.deleteUser(user).subscribe(
      resp => this.getUser(),
      err => console.log(err)
    )
  }
}
