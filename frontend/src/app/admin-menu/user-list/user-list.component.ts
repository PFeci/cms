import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserListService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      resp => {
        if(resp['body']){
          console.log(resp);
          this.users = resp['body'];
          console.log(this.users);
        }
      },
      err => console.log(err)
    )
  }

}
