import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SettingComponent} from './setting.component';
import {SettingListComponent} from './setting-list/setting-list.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: '',
        component: SettingListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}

