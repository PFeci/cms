import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DatabaseComponent} from "./database.component";
import {DatabaseSettingComponent} from "./database-setting/database-setting.component";

const routes: Routes = [
  {
    path: '',
    component: DatabaseComponent,
    children: [
      {
        path: '',
        component: DatabaseSettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseRoutingModule {
}

