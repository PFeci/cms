import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {OtherMenuComponent} from './other-menu.component';
import {SettingsComponent} from './settings/settings.component';
import {SecondCategoryComponent} from './second-category/second-category.component';

const routes: Routes = [
  {
    path: '',
    component: OtherMenuComponent,
    children: [
      {
        path: 'setting',
        component: SettingsComponent
      },
      {
        path: 'second-category',
        component: SecondCategoryComponent
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

