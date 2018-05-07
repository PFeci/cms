import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminMenuComponent} from './admin-menu.component';
import {UserListComponent} from './user-list/user-list.component';
import {CategoryComponent} from './category/category.component';
import {EmailSettingComponent} from './email-setting/email-setting.component';
import {DatabaseSettingComponent} from './database-setting/database-setting.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMenuComponent,
    children: [
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'content',
        component: CategoryComponent,
      },
      {
        path: 'email',
        component: EmailSettingComponent,
      },
      {
        path: 'updateDatabase',
        component: DatabaseSettingComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMenuRoutingModule { }
