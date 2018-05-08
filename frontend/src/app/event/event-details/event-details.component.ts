import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  happening: HappeningDTO = <HappeningDTO>{};

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['eventId'];
      this.eventService.getEventById(id).subscribe(
        resp => {this.happening = resp;},
        err => console.log(err)
      )
    });
  }

}
