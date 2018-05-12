import {Component, OnInit} from '@angular/core';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {EventService} from '../event.service';
import {CategoryDTO} from '../../../../../src/dtos/category-dto';
import {SecondCategoryDTO} from '../../../../../src/dtos/second-category-dto';
import * as _ from 'lodash';
import {CategoryService} from '../../category/category.service';
import {SecondCategoryService} from '../../second-category/second-category.service';
import {MouseEvent as AGMMouseEvent} from '@agm/core';
import {GeocodeService} from '../geocode.service';
import {Location} from '../../../../../src/interface/location';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.scss']
})
export class EventUpdateComponent implements OnInit {

  zoom: number = 12;
  lat: number = 38.736946;
  lng: number = -9.142685;
  marker: Marker = <Marker>{};

  updateEvent: HappeningDTO = <HappeningDTO>{
    contents: [],
    secondCategories: [],
    categories: []
  };
  categories: CategoryDTO[] = [];
  secondCategories: SecondCategoryDTO[] = [];

  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private secondCategoryService: SecondCategoryService,
              private geocodeService: GeocodeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['eventId'];
      if (id !== '0') {
        this.getEvent(id);
      }
    });

    this.categoryService.getCategories().subscribe(
      resp => this.categories = resp,
      err => console.log(err)
    );
    this.secondCategoryService.getSecondCategories().subscribe(
      resp => this.secondCategories = resp,
      err => console.log(err)
    );
  }

  getEvent(id) {
    this.eventService.getEventById(id).subscribe(
      resp => {
        this.updateEvent = resp;
        this.updateEvent.startDate = new Date(this.updateEvent.startDate);
        this.updateEvent.endDate = new Date(this.updateEvent.endDate);
        if (this.updateEvent.location) {
          this.marker.lat = this.updateEvent.location.lat;
          this.marker.lng = this.updateEvent.location.lng;
        }
      },
      err => console.log(err)
    );
  }

  saveEvent() {
    this.updateEvent.location.lng = this.marker.lng;
    this.updateEvent.location.lat = this.marker.lat;
    if (this.updateEvent.id) {
      this.eventService.updateEvent(this.updateEvent).subscribe(
        resp => this.router.navigate(['home/event/user']),
        err => console.log(err)
      );
    } else {
      this.eventService.saveNewEvent(this.updateEvent).subscribe(
        resp => {
          this.updateEvent = resp;
          this.updateEvent.startDate = new Date(this.updateEvent.startDate);
          this.updateEvent.endDate = new Date(this.updateEvent.endDate);
        },
        err => console.log(err)
      );
    }
  }

  deleteEvent(content) {
    if (this.updateEvent.id && !content.src) {
      this.eventService.deleteEvent(this.updateEvent).subscribe(
        resp => this.router.navigate(['home/event/user']),
        err => console.log(err)
      );
    } else if (content.src) {
      this.eventService.deleteContent(content.id).subscribe(
        resp => {
          this.getEvent(this.updateEvent.id);
        },
        err => console.log(err)
      )
      ;
    }
  }

  addedCategory(category) {
    let result = _.findIndex(this.updateEvent.categories, category);
    return result !== -1;
  }

  changeCategory(category) {
    let result = _.findIndex(this.updateEvent.categories, category);
    if (result !== -1) {
      _.remove(this.updateEvent.categories, {id: category.id});
    } else {
      this.updateEvent.categories.push(category);
    }
  }

  addedSecondCategory(category) {
    let result = _.findIndex(this.updateEvent.secondCategories, category);
    return result !== -1;
  }

  changeSecondCategory(category) {
    let result = _.findIndex(this.updateEvent.secondCategories, category);
    if (result !== -1) {
      _.remove(this.updateEvent.secondCategories, {id: category.id});
    } else {
      this.updateEvent.secondCategories.push(category);
    }
  }


  mapClicked($event: AGMMouseEvent) {

    this.marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
    };

    this.geocodeService.geocodeAddress(this.marker)
      .subscribe(
        location => {
          !this.updateEvent.location ? this.updateEvent.location = <Location>{} : '';
          this.updateEvent.location.address = location.address;
        }
      );
  }

}

export interface Marker {
  lat: number;
  lng: number;
}
