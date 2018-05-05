import { Injectable } from '@angular/core';
import {ObserveOnMessage} from 'rxjs/operators/observeOn';
import {Observable} from 'rxjs/Observable';
import {UserDTO} from '../../../../src/dtos/user-dto';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {HappeningDTO} from '../../../../src/dtos/happening-dto';
import {CategoryDTO} from '../../../../src/dtos/category-dto';
import {SecondCategoryDTO} from '../../../../src/dtos/second-category-dto';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class EventService {

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  getUsersEvent(): Observable<any> {
    const request: HttpRequest<HappeningDTO> = new HttpRequest<HappeningDTO>('GET', 'api/happening/all');
    return this.http.request(request);
  }

  updateEvent(updateEvent): Observable<any> {
    const request: HttpRequest<HappeningDTO> = new HttpRequest<HappeningDTO>('PUT', 'api/happening', updateEvent);
    return this.http.request(request);
  }

  deleteEvent(deleteEvent): Observable<any> {
    const request: HttpRequest<HappeningDTO> = new HttpRequest<HappeningDTO>('DELETE', 'api/happening');
    return this.http.request(request);
  }

  subscribeEvent(subscribe: HappeningDTO): Observable<any> {
    let body = {
      happeningId: subscribe.id,
      userId: this.authService.getUserId()
    };
    const request: HttpRequest<HappeningDTO> = new HttpRequest<any>('POST', 'api/happening/subscribe', body);
    return this.http.request(request);
  }

  unsubscribeEvent(unsubscribe: HappeningDTO): Observable<any> {
    let body = {
      happeningId: unsubscribe.id,
      userId: this.authService.getUserId()
    };
    const request: HttpRequest<HappeningDTO> = new HttpRequest<any>('POST', 'api/happening/unsubscribe', body);
    return this.http.request(request);
  }

}
