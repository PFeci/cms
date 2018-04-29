import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLoged: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoged = this.authService.getToken() ? true : false;
    this.authService.loggedIn.subscribe(
      resp => this.isLoged = true);
  }

}
