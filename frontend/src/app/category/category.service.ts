import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CategoryDTO} from '../../../../src/dtos/category-dto';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>('api/category/all');
  }

  deleteCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.delete<CategoryDTO>(`api/category/${category.id}`);
  }

  updateCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>('api/category', category);
  }

  createCategory(category): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>('api/category', category);
  }
}
