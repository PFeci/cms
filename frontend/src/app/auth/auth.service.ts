import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {UserDTO} from '../../../../src/dtos/user-dto';

@Injectable()
export class AuthService {

  private token: string;
  private currentUser: UserDTO;
  public loggedIn = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  getToken(){
    return this.token;
  }

  getUser(){
    return this.currentUser;
  }

  login(user) {
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('POST', 'api/auth/login', user);
    return this.http.request(request);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/home/event']);
  }

  register(user) {
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('POST', 'api/auth/register', user);
    return this.http.request(request);
  }

  saveToken(resp){
    if(resp.body){
      let token = resp.body.token;
      let user = resp.body.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.token = token;
      this.currentUser = user;
      this.loggedIn.next(true);
    }
  }

}
