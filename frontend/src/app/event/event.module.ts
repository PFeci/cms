import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { EventListComponent } from './event-list/event-list.component';
import {EventService} from './event.service';
import {EventRoutingModule} from './event-routing.module';
import { UserEventComponent } from './user-event/user-event.component';
import { EventUpdateComponent } from './event-update/event-update.component';
import {CalendarModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    CalendarModule,
    FormsModule
  ],
  declarations: [EventComponent, EventListComponent, UserEventComponent, EventUpdateComponent],
  providers: [EventService]
})
export class EventModule { }
