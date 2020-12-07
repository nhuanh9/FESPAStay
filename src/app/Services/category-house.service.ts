import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {House} from '../model/House';
import {CategoryHouse} from '../model/categoryHouse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryHouseService {
  API_URL = environment.apiUrl + '/categoryHouses';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CategoryHouse[]> {
    return this.http.get<CategoryHouse[]>(this.API_URL);
  }
}
