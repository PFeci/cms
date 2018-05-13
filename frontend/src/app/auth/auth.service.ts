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
  private user: UserDTO;
  public loggedIn = new Subject<boolean>();
  public refreshedUser = new Subject<UserDTO>();

  constructor(private http: HttpClient, private router: Router) {
    localStorage.getItem('token') ? this.token = localStorage.getItem('token') : '';
    localStorage.getItem('user') ? this.user = JSON.parse(localStorage.getItem('user')) : '';
  }

  getToken() {
    return this.token;
  }

  getUser(): UserDTO {
    return this.user;
  }

  getUserById(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`api/user/${this.user.id}`);
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
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    this.token = token;
    this.user = user;
    this.loggedIn.next(true);
  }

  refreshUser() {
    let user;
    this.getUserById().subscribe(
      resp => {
        user = resp;
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        this.refreshedUser.next(user);
      },
      err => console.log(err)
    );
  }

}
