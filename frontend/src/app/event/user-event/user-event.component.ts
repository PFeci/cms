import { Component, OnInit } from '@angular/core';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {EventService} from '../event.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {

  newEvent: HappeningDTO;
  usersEvent: HappeningDTO[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents(){
    this.eventService.getUsersEvent().subscribe(
      resp => this.usersEvent = resp['body'],
      err => console.log(err)
    );
  }

  createNewEvent(){
    this.newEvent = <HappeningDTO>{};
    this.newEvent.categories = [];
    this.newEvent.secondCategories = [];
    this.newEvent.contents = [];
  }

  refreshEvents(updatedEvent){
    this.getAllEvents();
    this.newEvent ? this.newEvent = null : '';
    updatedEvent ? updatedEvent.update = false : '';
  }
}
