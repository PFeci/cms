import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {
  SecondCategoryListComponent
} from '../second-category/second-category-list/second-category-list.component';
import {SecondCategoryComponent} from './second-category.component';

const routes: Routes = [
  {
    path: '',
    component: SecondCategoryComponent,
    children: [
      {
        path: '',
        component: SecondCategoryListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondCategoryRoutingModule {
}

