import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      resp => this.events = resp,
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
}