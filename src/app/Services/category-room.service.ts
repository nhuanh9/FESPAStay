import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryHouse} from '../model/categoryHouse';
import {CategoryRoom} from '../model/categoryRoom';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryRoomService {
  API_URL = environment.apiUrl + '/category/room';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CategoryRoom[]> {
    return this.http.get<CategoryRoom[]>(this.API_URL);
  }
}
