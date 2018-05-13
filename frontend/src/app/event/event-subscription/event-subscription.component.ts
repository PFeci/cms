import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {UserDTO} from '../../../../../src/dtos/user-dto';

@Component({
  selector: 'app-event-subscription',
  templateUrl: './event-subscription.component.html',
  styleUrls: ['./event-subscription.component.scss']
})
export class EventSubscriptionComponent implements OnInit {

  events: HappeningDTO[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getEvents();
    this.authService.refreshedUser.subscribe(
      resp => {
        this.events = resp.happenings;
      }
    );
  }

  getEvents() {
    this.events = this.authService.getUser().happenings;
  }

}
