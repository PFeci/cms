import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserDTO} from '../../../../src/dtos/user-dto';
import {CategoryDTO} from '../../../../src/dtos/category-dto';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>('api/user/all');
  }

  updateUser(user): Observable<UserDTO> {
    return this.http.put<UserDTO>('api/user', user);
  }

  deleteUser(user): Observable<UserDTO>{
    return this.http.delete<UserDTO>(`api/user/${user.id}`);
  }

  changeRole(user): Observable<UserDTO> {
    return this.http.put<UserDTO>('api/user/role', user);
    }

}
