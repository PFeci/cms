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
        path: 'category',
        loadChildren: 'app/category/category.module#CategoryModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'users',
        loadChildren: 'app/users/users.module#UsersModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'second-category',
        loadChildren: 'app/second-category/second-category.module#SecondCategoryModule',
        // canActivate: [AuthGuardService] -- supporter
      },
      {
        path: 'setting',
        loadChildren: 'app/setting/setting.module#SettingModule',
      },
      {
        path: 'email',
        loadChildren: 'app/email/email.module#EmailModule'
      },
      {
        path: 'database',
        loadChildren: 'app/database/database.module#DatabaseModule'
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

