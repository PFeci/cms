import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { EventListComponent } from './event-list/event-list.component';
import {EventService} from './event.service';
import {EventRoutingModule} from './event-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule
  ],
  declarations: [EventComponent, EventListComponent],
  providers: [EventService]
})
export class EventModule { }
