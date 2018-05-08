import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmailComponent} from "./email.component";
import {EmailSettingComponent} from "./email-setting/email-setting.component";

const routes: Routes = [
  {
    path: '',
    component: EmailComponent,
    children: [
      {
        path: '',
        component: EmailSettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {
}

