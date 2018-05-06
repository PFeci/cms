import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {EventService} from '../event.service';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {AuthService} from '../../auth/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() event: HappeningDTO;
  @Input() index: number;
  user: UserDTO;
  @Output() eventRefresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(private eventService: EventService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.getUserId()) {
      this.getUser();
    }
  }

  getUser() {
    if (this.authService.getUserId()) {
      this.authService.getUser().subscribe(
        resp => {
          this.user = resp;
        },
        err => console.log(err)
      );
    }
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
      resp => this.getUser(),
      err => console.log(err)
    );
  }

  unsubscribeEvent() {
    this.eventService.unsubscribeEvent(this.event).subscribe(
      resp => {
        this.getUser();
        this.eventRefresh.emit();
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
}
