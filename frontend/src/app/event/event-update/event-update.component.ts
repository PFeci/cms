import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {EventService} from '../event.service';
import {CategoryDTO} from '../../../../../src/dtos/category-dto';
import {SecondCategoryDTO} from '../../../../../src/dtos/second-category-dto';
import * as _ from 'lodash';
import {CategoryService} from '../../category/category.service';
import {SecondCategoryService} from '../../second-category/second-category.service';
import {MouseEvent as AGMMouseEvent} from '@agm/core';
import {GeocodeService} from "../geocode.service";

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

  @Input() updateEvent: HappeningDTO;
  categories: CategoryDTO[] = [];
  secondCategories: SecondCategoryDTO[] = [];
  @Output() finishUpdate: EventEmitter<boolean> = new EventEmitter();

  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private secondCategoryService: SecondCategoryService,
              private geocodeService: GeocodeService) {
  }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(
      resp => this.categories = resp,
      err => console.log(err)
    );
    this.secondCategoryService.getSecondCategories().subscribe(
      resp => this.secondCategories = resp,
      err => console.log(err)
    );
    this.marker.lat = this.updateEvent.location.lat;
    this.marker.lng = this.updateEvent.location.lng;

  }

  saveEvent() {
    this.updateEvent.location.lng = this.marker.lng;
    this.updateEvent.location.lat = this.marker.lat;
    if (this.updateEvent.id) {
      this.eventService.updateEvent(this.updateEvent).subscribe(
        resp => this.finishUpdate.emit(true),
        err => console.log(err)
      )
    } else {
      this.eventService.saveNewEvent(this.updateEvent).subscribe(
        resp => this.finishUpdate.emit(true),
        err => console.log(err)
      );
    }
  }

  deleteEvent() {
    if (this.updateEvent.id) {
      this.eventService.deleteEvent(this.updateEvent).subscribe(
        resp => this.finishUpdate.emit(true),
        err => console.log(err)
      )
    } else {
      this.finishUpdate.emit(true);
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
          console.log(location.address);
          this.updateEvent.location.address = location.address;
        }
      );
  }

}

export interface Marker {
  lat: number;
  lng: number;
}
