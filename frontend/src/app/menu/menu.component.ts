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
  }

  getUser() {
    if (this.authService.loggedIn) {
      this.authService.getUser().subscribe(
        resp => this.user = resp['body'],
        err => console.log(err)
      );
    }
  }

  logout() {
    this.authService.logout();
  }

}
