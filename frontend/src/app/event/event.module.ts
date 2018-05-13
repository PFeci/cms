import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventComponent} from './event.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventService} from './event.service';
import {EventRoutingModule} from './event-routing.module';
import {UserEventComponent} from './user-event/user-event.component';
import {EventUpdateComponent} from './event-update/event-update.component';
import {CalendarModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md/index';
import {EventSubscriptionComponent} from './event-subscription/event-subscription.component';
import {EventCardComponent} from './event-card/event-card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ShareButtonModule} from '@ngx-share/button';
import {TokenInterceptor} from '../auth/token.interceptor';
import {SharedModule} from '../shared/shared.module';
import {EventDetailsComponent} from './event-details/event-details.component';
import {CategoryService} from '../category/category.service';
import {SecondCategoryService} from '../second-category/second-category.service';
import {AgmCoreModule} from "@agm/core";
import {GeocodeService} from "./geocode.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {CategorySearchPipe} from "./category-search.pipe";

@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    EventRoutingModule,
    CalendarModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,      // (Required) for share counts
    ShareButtonModule.forRoot(),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyB1jDg7PjguTCz6-gqoGj8BvyJH5sV-VzE'
    })
  ],
  declarations: [CategorySearchPipe, EventComponent, EventListComponent, UserEventComponent, EventUpdateComponent, EventSubscriptionComponent, EventCardComponent, EventDetailsComponent],
  providers: [EventService, CategoryService, SecondCategoryService, GeocodeService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class EventModule {
}
