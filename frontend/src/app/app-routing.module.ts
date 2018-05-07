import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenuComponent} from './menu/menu.component';
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
        canActivate: [AuthGuardService]
      },
      {
        path: 'other',
        loadChildren: 'app/other-menu/other-menu.module#OtherMenuModule',
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

