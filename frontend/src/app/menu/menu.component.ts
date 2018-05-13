import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserDTO} from '../../../../src/dtos/user-dto';
import {Role} from '../../../../src/enums/role';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLoged: boolean = false;
  user: UserDTO = <UserDTO> {};
  admin = Role.ADMIN;
  supporter = Role.SUPPORTER;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoged = this.authService.getToken() ? true : false;
    this.getUser();
    this.authService.loggedIn.subscribe(
      resp => {
        this.isLoged = resp;
        this.getUser();
      });
    this.authService.refreshedUser.subscribe(
      resp => {
        this.user = resp;
      });
  }

  getUser() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }

}
