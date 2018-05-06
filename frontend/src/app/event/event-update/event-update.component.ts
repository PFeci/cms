import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import {EventService} from '../event.service';
import {CategoryDTO} from '../../../../../src/dtos/category-dto';
import {SecondCategoryDTO} from '../../../../../src/dtos/second-category-dto';
import * as _ from 'lodash';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.scss']
})
export class EventUpdateComponent implements OnInit {

  @Input() updateEvent: HappeningDTO;
  categories: CategoryDTO[] = [];
  secondCategories: SecondCategoryDTO[] = [];
  @Output() finishUpdate: EventEmitter<boolean> = new EventEmitter();

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getCategories().subscribe(
      resp => this.categories = resp,
      err => console.log(err)
    );
    this.eventService.getSecondCategories().subscribe(
      resp => this.secondCategories = resp['body'],
      err => console.log(err)
    );
  }

  saveEvent() {
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

}
