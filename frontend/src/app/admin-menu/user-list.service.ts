import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserDTO} from '../../../../src/dtos/user-dto';

@Injectable()
export class UserListService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('GET', 'api/user/all');
    return this.http.request(request);
  }

}
