import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from '../category/category-list/category-list.component';
import {CategoryComponent} from './category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      {
        path: '',
        component: CategoryListComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
