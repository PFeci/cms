import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {EventService} from '../event.service';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {AuthService} from '../../auth/auth.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() event: HappeningDTO;
  @Input() index: number;
  user: UserDTO;
  currentUrl: string;

  constructor(private eventService: EventService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getUser();
    this.currentUrl = window.location.href;

    this.authService.loggedIn.subscribe(
      resp => {
        !resp ? this.user = null : this.getUser();
      });

    this.authService.refreshedUser.subscribe(
      resp => {
        console.log(resp);
        this.user = resp;
      }
    );
  }

  getUser() {
    console.log('getUSer');
    this.user = this.authService.getUser();
  }

  flippCard() {
    let id = 'flipp' + this.index;
    if (document.getElementById(id).classList.contains('hover')) {
      document.getElementById(id).classList.remove('hover');
    } else {
      document.getElementById(id).classList.add('hover');
    }
  }

  subscribeEvent() {
    this.eventService.subscribeEvent(this.event).subscribe(
      resp => this.authService.refreshUser(),
      err => console.log(err)
    );
  }

  unsubscribeEvent() {
    this.eventService.unsubscribeEvent(this.event).subscribe(
      resp => {
        this.authService.refreshUser();
      },
      err => console.log(err)
    );
  }

  isSubscribe() {
    if (this.user) {
      let index = _.findIndex(this.user.happenings, {id: this.event.id});
      return index !== -1;
    }
  }

  goToDetails(eventId) {
    this.router.navigate(['/home/event/details/', eventId]);
  }
}
