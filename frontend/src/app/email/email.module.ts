import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './email.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
import {EmailRoutingModule} from "./email-routing.module";
import {TokenInterceptor} from "../auth/token.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {EmailService} from "./email.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    EmailRoutingModule,
    FormsModule
  ],
  declarations: [EmailComponent, EmailSettingComponent],
  providers: [EmailService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class EmailModule { }
