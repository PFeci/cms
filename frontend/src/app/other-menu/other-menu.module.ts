import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OtherMenuRoutingModule} from './other-menu-routing.module';
import {OtherMenuComponent} from './other-menu.component';
import {SettingsComponent} from './settings/settings.component';
import {OtherMenuService} from './other-menu.service';
import {FormsModule} from '@angular/forms';
import {EventService} from '../event/event.service';
import {CategoryService} from '../admin-menu/category.service';
import {TokenInterceptor} from '../auth/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { SecondCategoryComponent } from './second-category/second-category.component';
import {CommonsModule} from '../common/commons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OtherMenuRoutingModule,
    CommonsModule
  ],
  declarations: [OtherMenuComponent, SettingsComponent, SecondCategoryComponent],
  providers: [OtherMenuService, EventService, CategoryService,  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})

export class OtherMenuModule { }
