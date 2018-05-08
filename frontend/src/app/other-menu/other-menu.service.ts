import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDTO} from '../../../../src/dtos/user-dto';
import {Observable} from 'rxjs/Observable';
import {SecondCategoryDTO} from '../../../../src/dtos/second-category-dto';

@Injectable()
export class OtherMenuService {

  constructor(private http: HttpClient) {
  }

  updateUser(user): Observable<UserDTO> {
    return this.http.put<UserDTO>('api/user', user);
  }

  getSecondCategories(): Observable<SecondCategoryDTO[]> {
    return this.http.get<SecondCategoryDTO[]>('api/secondcategory/all');
  }

  deleteSecondCategory(scategory: SecondCategoryDTO): Observable<SecondCategoryDTO>{
    return this.http.delete<SecondCategoryDTO>(`api/secondcategory/${scategory.id}`);
  }

  updateSecondCategory(scategory: SecondCategoryDTO): Observable<SecondCategoryDTO> {
    return this.http.put<SecondCategoryDTO>('api/secondcategory', scategory);
  }

  createSecondCategory(scategory: SecondCategoryDTO): Observable<SecondCategoryDTO> {
    return this.http.post<SecondCategoryDTO>('api/secondcategory', scategory)
  }

}
