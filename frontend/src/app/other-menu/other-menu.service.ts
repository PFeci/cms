import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDTO} from '../../../../src/dtos/user-dto';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OtherMenuService {

  constructor(private http: HttpClient) {
  }

  updateUser(user): Observable<UserDTO> {
    return this.http.put<UserDTO>('api/user', user);
  }

}
