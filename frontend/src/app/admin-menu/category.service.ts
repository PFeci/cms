import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CategoryDTO} from '../../../../src/dtos/category-dto';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    const request: HttpRequest<CategoryDTO> = new HttpRequest<CategoryDTO>('GET', 'api/category/all');
    return this.http.request(request);
  }

  deleteCategory(category: CategoryDTO): Observable<any> {
    const request: HttpRequest<CategoryDTO> = new HttpRequest<CategoryDTO>('DELETE', `api/category/${category.id}`);
    return this.http.request(request);
  }

  updateCategory(category: CategoryDTO): Observable<any> {
    const request: HttpRequest<CategoryDTO> = new HttpRequest<CategoryDTO>('PUT', 'api/category', category);
    return this.http.request(request);
  }

  createCategory(category): Observable<any> {
    const request: HttpRequest<CategoryDTO> = new HttpRequest<CategoryDTO>('POST', 'api/category', category);
    return this.http.request(request);
  }
}
