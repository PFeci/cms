import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserDTO} from '../../../../src/dtos/user-dto';

@Injectable()
export class UserListService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('GET', 'api/user/all');
    return this.http.request(request);
  }

  updateUser(user): Observable<any> {
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('PUT', 'api/user', user);
    return this.http.request(request);
  }

  deleteUser(user): Observable<any>{
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('PUT', 'api/user', user);
    return this.http.request(request);
  }

  changeRole(user): Observable<any> {
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('PUT', 'api/user/role', user);
    return this.http.request(request);
  }

}
