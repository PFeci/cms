import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminMenuRoutingModule} from './admin-menu-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import {UserListService} from './user-list.service';
import {AdminMenuComponent} from './admin-menu.component';
import { ContentComponent } from './content/content.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
import { DatabaseSettingComponent } from './database-setting/database-setting.component';

@NgModule({
  imports: [
    CommonModule,
    AdminMenuRoutingModule
  ],
  declarations: [UserListComponent, AdminMenuComponent, ContentComponent, EmailSettingComponent, DatabaseSettingComponent],
  providers: [UserListService]
})
export class AdminMenuModule { }
