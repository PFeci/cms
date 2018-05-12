import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../event.service';
import {SecondCategoryService} from "../../second-category/second-category.service";
import {CategoryService} from "../../category/category.service";
import {CategoryComponent} from "../../category/category.component";
import {CategoryDTO} from "../../../../../src/dtos/category-dto";
import {HappeningDTO} from "../../../../../src/dtos/happening-dto";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  categories: any[] = [];
  selectedCategories: any[] = [];


  events: HappeningDTO[] = [];

  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private secondCategoryService: SecondCategoryService) {
  }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(
      (categories: CategoryDTO[]) => {
        this.categories = this.categories.concat(categories);
      },
      (err) => {
        console.log(err);
      }
    );
    this.secondCategoryService.getSecondCategories().subscribe(
      (secondCategories: CategoryDTO[]) => {
        this.categories = this.categories.concat(secondCategories);
      },
      (err) => {
        console.log(err);
      }
    );

    this.eventService.getEvents().subscribe(
      resp => {
        this.events = resp;
      },
      err => console.log(err)
    )
  }

}
