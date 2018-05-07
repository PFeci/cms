import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {OtherMenuComponent} from './other-menu.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: OtherMenuComponent,
    children: [
      {
        path: 'setting',
        component: SettingsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherMenuRoutingModule {
}

