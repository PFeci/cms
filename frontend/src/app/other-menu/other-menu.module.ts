import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OtherMenuRoutingModule} from './other-menu-routing.module';
import {OtherMenuComponent} from './other-menu.component';
import {SettingsComponent} from './settings/settings.component';
import {OtherMenuService} from './other-menu.service';
import {FormsModule} from '@angular/forms';
import {EventService} from '../event/event.service';
import {CategoryService} from '../admin-menu/category.service';
import {UserListService} from '../admin-menu/user-list.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OtherMenuRoutingModule
  ],
  declarations: [OtherMenuComponent, SettingsComponent],
  providers: [OtherMenuService, EventService, CategoryService]
})

export class OtherMenuModule { }
