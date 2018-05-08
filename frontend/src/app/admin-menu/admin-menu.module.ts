import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminMenuRoutingModule} from './admin-menu-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {UserListService} from './user-list.service';
import {AdminMenuComponent} from './admin-menu.component';
import {CategoryComponent} from './category/category.component';
import {EmailSettingComponent} from './email-setting/email-setting.component';
import {DatabaseSettingComponent} from './database-setting/database-setting.component';
import {FormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md/index';
import {CategoryService} from './category.service';
import {CommonsModule} from '../common/commons.module';
import {TokenInterceptor} from '../auth/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AdminMenuRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    CommonsModule
  ],
  declarations: [UserListComponent, AdminMenuComponent, CategoryComponent, EmailSettingComponent, DatabaseSettingComponent],
  providers: [UserListService, CategoryService,  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  schemas: [NO_ERRORS_SCHEMA]

})
export class AdminMenuModule {
}
