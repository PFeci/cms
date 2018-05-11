import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';


@Pipe({name: 'categorySearch'})
export class CategorySearchPipe implements PipeTransform {
  transform(items: any, filters: any[]): number {
    if (filters.length === 0) {
      return items;
    }


    return items.filter(item => {
      let good: boolean = false;
      let i = 0;
      while (!good && i < filters.length) {
        if ((_.filter(item.categories, {id: filters[i]}).length !== 0) ||
          (_.filter(item.secondCategories, {id: filters[i]}).length !== 0)) {
          good = true;
        }
        i++;
      }
      return good;
    })
  }
}
