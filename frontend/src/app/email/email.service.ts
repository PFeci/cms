import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {EmailDTO} from "../../../../src/dtos/email-dto";

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }

  getNewEmail(): Observable<EmailDTO> {
    return this.http.get<EmailDTO>('api/setting/email/new');
  }

  updateNewEmail(email: EmailDTO): Observable<EmailDTO> {
    return this.http.put<EmailDTO>('api/setting/email/new', email);
  }

  getUpdateEmail(): Observable<EmailDTO> {
    return this.http.get<EmailDTO>('api/setting/email/update');
  }

  updateUpdateEmail(email: EmailDTO): Observable<EmailDTO> {
    return this.http.put<EmailDTO>('api/setting/email/update', email);
  }

  getEmailConf(): Observable<any> {
    return this.http.get<any>('api/setting/email/conf');
  }

  updateEmailConf(conf: any): Observable<any> {
    return this.http.put<any>('api/setting/email/conf', conf);
  }
}
