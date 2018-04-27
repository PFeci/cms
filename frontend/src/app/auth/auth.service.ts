import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

class User {
}

@Injectable()
export class AuthService {

  currentUser: User;

  constructor(private http: HttpClient) { }

  getToken(){}

  login(user) {
    const request: HttpRequest<User> = new HttpRequest<User>('GET', 'api/auth/login', user);
    return this.http.request(request).subscribe(
      resp => this.currentUser = resp['user'],
      err => console.log(err)
    );
  }
}
