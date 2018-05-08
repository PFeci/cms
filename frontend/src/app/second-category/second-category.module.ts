import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondCategoryComponent } from './second-category.component';
import {SecondCategoryRoutingModule} from './second-category-routing.module';
import {SecondCategoryListComponent} from './second-category-list/second-category-list.component';
import {SecondCategoryService} from './second-category.service';
import {TokenInterceptor} from '../auth/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SecondCategoryRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [SecondCategoryComponent, SecondCategoryListComponent],
  providers: [SecondCategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }]
})
export class SecondCategoryModule { }
