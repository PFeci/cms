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

  getEvents(): Observable<HappeningDTO[]> {
    return this.http.get<HappeningDTO[]>('api/happening/all');
  }

  saveNewEvent(newEvent: HappeningDTO): Observable<HappeningDTO> {
    return this.http.post<HappeningDTO>('api/happening', newEvent);
  }

  getCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>('api/category/all');
  }

  getSecondCategories(): Observable<SecondCategoryDTO[]> {
    return this.http.get<SecondCategoryDTO[]>('api/secondcategory/all');
  }

  updateEvent(updateEvent): Observable<HappeningDTO> {
    return this.http.put<HappeningDTO>('api/happening', updateEvent);
  }

  deleteEvent(deleteEvent: HappeningDTO): Observable<HappeningDTO> {
    return this.http.delete<HappeningDTO>(`api/happening/${deleteEvent.id}`);
  }

  subscribeEvent(subscribe: HappeningDTO): Observable<HappeningDTO> {
    let body = {
      happeningId: subscribe.id,
      userId: this.authService.getUserId()
    };
    return this.http.post<HappeningDTO>('api/happening/subscribe', body);
  }

  unsubscribeEvent(unsubscribe: HappeningDTO): Observable<HappeningDTO> {
    let body = {
      happeningId: unsubscribe.id,
      userId: this.authService.getUserId()
    };
    return this.http.post<HappeningDTO>('api/happening/unsubscribe', body);
  }

}
