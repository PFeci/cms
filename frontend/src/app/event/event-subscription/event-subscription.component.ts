import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';

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
  }

  getEvents(){
    this.authService.getUser().subscribe(
      resp => {
          this.events = resp['happenings'];
      },
      err => console.log(err)
    );
  }

}
