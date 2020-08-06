import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HouseImages} from "../model/houseImages";
import {Room} from "../model/room";

@Injectable({
  providedIn: 'root'
})
export class HouseImagesService {
  API_URL = environment.apiUrl + '/images'

  constructor(private http: HttpClient) {
  }

  create(image): Observable<HouseImages> {
    return this.http.post<HouseImages>(this.API_URL, image);
  }

  delete(id: string): Observable<HouseImages> {
    return this.http.delete<HouseImages>(this.API_URL + `/${id}`);
  }

  getAllByIdHouse(id: string): Observable<HouseImages[]> {
    return this.http.get<HouseImages[]>(this.API_URL + `/search-house/${id}`)
  }

  getAll(): Observable<HouseImages[]> {
    return this.http.get<HouseImages[]>(this.API_URL)
  }
}
