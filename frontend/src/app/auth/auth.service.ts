import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {UserDTO} from '../../../../src/dtos/user-dto';
import {Role} from '../../../../src/enums/role';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private token: string;
  private userId: string;
  private role: string;
  public loggedIn = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    localStorage.getItem('token') ? this.token = localStorage.getItem('token') : '';
    localStorage.getItem('user') ? this.userId = localStorage.getItem('user') : '';
    localStorage.getItem('role') ? this.role = localStorage.getItem('role') : '';
  }

  getToken() {
    return this.token;
  }

  getRole() {
    return this.role;
  }

  getUserId() {
    return this.userId;
  }

  getUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`api/user/${this.userId}`);
  }

  login(user): Observable<UserDTO> {
    return this.http.post<UserDTO>('api/auth/login', user);

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    this.router.navigate(['/home/event']);
  }

  register(user): Observable<UserDTO> {
    return this.http.post<UserDTO>('api/auth/register', user);

  }

  saveToken(resp) {
    let token = resp.token;
    let user = resp.user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', user.id);
    localStorage.setItem('role', user.role);
    this.token = token;
    this.userId = user.id;
    this.role = user.role;
    this.loggedIn.next(true);

  }

}
