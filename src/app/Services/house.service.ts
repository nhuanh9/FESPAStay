import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {House} from '../model/House';
import {environment} from '../../environments/environment';
import {Room} from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  API_URL = environment.apiUrl + '/house';

  constructor(private http: HttpClient) {
  }

  getList(): Observable<House[]> {
    return this.http.get<House[]>(this.API_URL);
  }

  create(userId, house): Observable<House> {
    return this.http.post<House>(this.API_URL + `/user/${userId}`, house);
  }

  detail(id: string): Observable<House> {
    return this.http.get<House>(this.API_URL + `/${id}`);
  }

  edit(house: House, id: string): Observable<House> {
    return this.http.put<House>(this.API_URL + `/${id}`, house);
  }

  delete(id: string): Observable<House> {
    return this.http.delete<House>(this.API_URL + `/${id}`);
  }

  createRoom(idHouse, room): Observable<Room> {
    return this.http.post<Room>(this.API_URL + `/${idHouse}/room`, room);
  }

  searchAddress(address): Observable<House[]> {
    return this.http.post<House[]>(this.API_URL + `search`, address);
  }

  searchCategory(category): Observable<House[]> {
    return this.http.post<House[]>(this.API_URL + `/search-by-category`, category);
  }
}
