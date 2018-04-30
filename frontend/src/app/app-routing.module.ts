import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {EventComponent} from './event/event.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuardService} from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: MenuComponent,
    children: [
      {
        path: 'event',
        loadChildren: 'app/event/event.module#EventModule'
      },
      {
        path: 'admin',
        loadChildren: 'app/admin-menu/admin-menu.module#AdminMenuModule',
        canActivateChild: [AuthGuardService]
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/event'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

