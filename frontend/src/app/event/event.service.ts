import { Injectable } from '@angular/core';
import {ObserveOnMessage} from 'rxjs/operators/observeOn';
import {Observable} from 'rxjs/Observable';
import {UserDTO} from '../../../../src/dtos/user-dto';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {HappeningDTO} from '../../../../src/dtos/happening-dto';
import {CategoryDTO} from '../../../../src/dtos/category-dto';
import {SecondCategoryDTO} from '../../../../src/dtos/second-category-dto';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('GET', 'api/happening/all');
    return this.http.request(request);
  }

  saveNewEvent(newEvent: HappeningDTO): Observable<any> {
    const request: HttpRequest<HappeningDTO> = new HttpRequest<HappeningDTO>('POST', 'api/happening', newEvent);
    return this.http.request(request)
  }

  getCategories(): Observable<any> {
    const request: HttpRequest<CategoryDTO> = new HttpRequest<CategoryDTO>('GET', 'api/category/all');
    return this.http.request(request);
  }

  getSecondCategories(): Observable<any> {
    const request: HttpRequest<SecondCategoryDTO> = new HttpRequest<SecondCategoryDTO>('GET', 'api/secondcategory/all');
    return this.http.request(request);
  }


}
