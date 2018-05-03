import { Component, OnInit } from '@angular/core';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {AuthService} from '../../auth/auth.service';
import {UserDTO} from '../../../../../src/dtos/user-dto';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {

  newEvent: HappeningDTO;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  createNewEvent(){
    this.newEvent = <HappeningDTO>{};
    this.newEvent.categories = [];
    this.newEvent.secondCategories = [];
  }

}
