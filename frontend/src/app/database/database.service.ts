import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DatabaseDTO} from "../../../../src/dtos/database-dto";
import {Observable} from "rxjs/Observable";
import {EmailDTO} from "../../../../src/dtos/email-dto";

@Injectable()
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getDatabaseSettings(): Observable<DatabaseDTO>{
    return this.http.get<DatabaseDTO>('api/setting/database');
  }

  updateDatabaseSettings(setting: DatabaseDTO): Observable<DatabaseDTO>{
    return this.http.put<DatabaseDTO>('api/setting/database', setting);
  }

}
