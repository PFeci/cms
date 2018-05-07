import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserDTO} from '../../../../src/dtos/user-dto';

@Component({
  selector: 'app-other-menu',
  templateUrl: './other-menu.component.html',
  styleUrls: ['./other-menu.component.scss']
})
export class OtherMenuComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

}
