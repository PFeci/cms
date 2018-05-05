import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {UserDTO} from '../../../../src/dtos/user-dto';
import {Role} from '../../../../src/enums/role';

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

  getToken(){
    return this.token;
  }

  getRole(){
    return this.role;
  }

  getUserId() {
    return this.userId;
  }

  getUser(){
    const request: HttpRequest<UserDTO> = new HttpRequest<UserDTO>('GET', `api/user/${this.userId}`);
    return this.http.request(request);
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
      localStorage.setItem('user', user.id);
      localStorage.setItem('role', user.role);
      this.token = token;
      this.userId = user.id;
      this.role = user.role;
      this.loggedIn.next(true);
    }
  }

}
