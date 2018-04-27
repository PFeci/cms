import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventComponent} from './event.component';
import {EventListComponent} from './event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: '',
        component: EventListComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
