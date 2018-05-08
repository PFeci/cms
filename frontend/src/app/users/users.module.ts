import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersService} from './users.service';
import {TokenInterceptor} from '../auth/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [UsersComponent, UsersListComponent],
  providers: [UsersService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class UsersModule { }
