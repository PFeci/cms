import {Component, OnInit} from '@angular/core';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {EventService} from '../event.service';
import {AuthGuardService} from '../../auth/auth-guard.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {

  usersEvent: HappeningDTO[];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getAllEvents();
    this.authService.refreshedUser.subscribe(
      resp => this.usersEvent = resp.madeByMe
    )
  }

  getAllEvents() {
    this.usersEvent = this.authService.getUser().madeByMe;
    if (this.usersEvent.length !== 0) {
      this.usersEvent.forEach(event => {
        event.startDate = new Date(event.startDate);
        event.endDate = new Date(event.endDate);
      });
    }
  }
}
