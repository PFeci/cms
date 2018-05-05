import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventComponent} from './event.component';
import {EventListComponent} from './event-list/event-list.component';
import {UserEventComponent} from './user-event/user-event.component';
import {EventSubscriptionComponent} from './event-subscription/event-subscription.component';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: '',
        component: EventListComponent,
      },
      {
        path: 'user',
        component: UserEventComponent
      },
      {
        path: 'subscription',
        component: EventSubscriptionComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
