import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

class User {
}

@Injectable()
export class AuthService {

  private token: string;
  private currentUser: User;
  public loggedIn = new Subject();

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    this.currentUser = localStorage.getItem('user');
  }

  getToken(){
    return this.token;
  }

  login(user) {
    const request: HttpRequest<User> = new HttpRequest<User>('POST', 'api/auth/login', user);
    return this.http.request(request);
  }

  register(user) {
    const request: HttpRequest<User> = new HttpRequest<User>('POST', 'api/auth/register', user);
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
      this.loggedIn.next();
    }
  }

}
