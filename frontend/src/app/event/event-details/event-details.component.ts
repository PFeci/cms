import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {AuthService} from '../../auth/auth.service';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {Role} from '../../../../../src/enums/role';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  happening: HappeningDTO = <HappeningDTO>{};
  editMultimedia: boolean = false;
  user: UserDTO;
  Role = Role

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['eventId'];
      this.getEvent(id);
    });

    this.getUser();

    this.authService.loggedIn.subscribe(
      resp => {
        resp ? this.getUser() : this.user = null;
      }
    )
  }

  onNavigate(content) {
    window.open(content.src, '_blank');
  }

  getEvent(id) {
    this.eventService.getEventById(id).subscribe(
      resp => {
        this.happening = resp;
      },
      err => console.log(err)
    );
  }

  deleteContent(content) {
    this.eventService.deleteContent(content.id).subscribe(
      resp => this.getEvent(this.happening.id),
      err => console.log(err)
    );

  }

  getUser(){
    this.authService.getUser().subscribe(
      resp => this.user = resp,
      err => console.log(err)
    )
  }
}
