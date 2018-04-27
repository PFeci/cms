import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {EventComponent} from './event/event.component';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'event',
        loadChildren: 'app/event/event.module#EventModule'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/menu/event'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

