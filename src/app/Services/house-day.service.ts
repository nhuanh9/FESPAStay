import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/order";
import {HouseDay} from "../model/houseDay";
import {House} from "../model/House";

@Injectable({
  providedIn: 'root'
})
export class HouseDayService {
  API_URL = environment.apiUrl + '/houseDays';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<HouseDay[]> {
    return this.http.get<HouseDay[]>(this.API_URL);
  }

  create(houseDay): Observable<HouseDay> {
    return this.http.post<HouseDay>(this.API_URL, houseDay);
  }

  delete(id: string): Observable<HouseDay> {
    return this.http.delete<HouseDay>(this.API_URL + `/${id}`);
  }

  edit(houseDay: HouseDay, id: string): Observable<HouseDay> {
    return this.http.put<HouseDay>(this.API_URL + `/${id}`, houseDay);
  }
}
