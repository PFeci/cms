import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import {SettingListComponent} from './setting-list/setting-list.component';
import {SettingRoutingModule} from './setting-routing.module';
import {TokenInterceptor} from '../auth/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CategoryService} from '../category/category.service';
import {UsersService} from '../users/users.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule
  ],
  declarations: [SettingComponent, SettingListComponent],
  providers: [CategoryService, UsersService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class SettingModule { }
