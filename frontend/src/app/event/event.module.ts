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
import {MDBBootstrapModule} from 'angular-bootstrap-md/index';
import { EventSubscriptionComponent } from './event-subscription/event-subscription.component';
import { EventCardComponent } from './event-card/event-card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ShareButtonModule} from '@ngx-share/button';
import {TokenInterceptor} from '../auth/token.interceptor';
import {SharedModule} from '../shared/shared.module';
import { EventDetailsComponent } from './event-details/event-details.component';
import {CategoryService} from '../category/category.service';
import {SecondCategoryService} from '../second-category/second-category.service';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    CalendarModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    HttpClientModule,      // (Required) for share counts
    ShareButtonModule.forRoot()
  ],
  declarations: [EventComponent, EventListComponent, UserEventComponent, EventUpdateComponent, EventSubscriptionComponent, EventCardComponent, EventDetailsComponent],
  providers: [EventService, CategoryService, SecondCategoryService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class EventModule { }
