import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../event.service';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {AuthService} from '../../auth/auth.service';
import {HappeningDb} from '../../../../../src/database/interfaces/happening-db';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: any[] = [];
  user: UserDTO = <UserDTO>{};

  constructor(private eventService: EventService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.eventService.getEvents().subscribe(
      resp => {this.events = resp['body']; console.log(resp)},
      err => console.log(err)
    )
  }

  flippCard(index: number){
    let id = 'flipp'+ index;
    if(document.getElementById(id).classList.contains('hover')){
      document.getElementById(id).classList.remove('hover')
    } else {
      document.getElementById(id).classList.add('hover')
    }
  }

  subscribeEvent(event: HappeningDTO) {
    this.eventService.subscribeEvent(event).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    )
  }
}
