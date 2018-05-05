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
import {DeleteModalComponent} from '../common/delete-modal/delete-modal.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md/index';
import { EventSubscriptionComponent } from './event-subscription/event-subscription.component';
import { EventCardComponent } from './event-card/event-card.component';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    CalendarModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [EventComponent, EventListComponent, UserEventComponent, EventUpdateComponent, DeleteModalComponent, EventSubscriptionComponent, EventCardComponent],
  providers: [EventService]
})
export class EventModule { }
