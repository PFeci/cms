import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatabaseComponent} from './database.component';
import {DatabaseSettingComponent} from './database-setting/database-setting.component';
import {TokenInterceptor} from "../auth/token.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DatabaseRoutingModule} from "./database-routing.module";
import {DatabaseService} from "./database.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DatabaseRoutingModule
  ],
  declarations: [DatabaseComponent, DatabaseSettingComponent],
  providers: [DatabaseService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class DatabaseModule {
}
