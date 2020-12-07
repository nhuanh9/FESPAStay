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
  API_URL = environment.apiUrl + '/houses';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<House[]> {
    return this.http.get<House[]>(this.API_URL);
  }

  create(house): Observable<House> {
    return this.http.post<House>(this.API_URL, house);
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

  getAllByAddress(address): Observable<House[]> {
    return this.http.post<House[]>(this.API_URL + `search`, address);
  }

  getAllByCategory(category): Observable<House[]> {
    return this.http.post<House[]>(this.API_URL + `/search-by-category`, category);
  }
}
