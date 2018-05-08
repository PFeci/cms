import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryService} from './category.service';
import {TokenInterceptor} from '../auth/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [CategoryComponent, CategoryListComponent],
  providers: [CategoryService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class CategoryModule {
}
