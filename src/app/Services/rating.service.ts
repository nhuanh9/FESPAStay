import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HouseImages} from "../model/houseImages";
import {Rating} from "../model/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  API_URL = environment.apiUrl + '/rate'

  constructor(private http: HttpClient) {
  }

  create(rate): Observable<Rating> {
    return this.http.post<Rating>(this.API_URL, rate);
  }

  getAllByHouseId(id: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.API_URL + `/find-rates-of-house/${id}`)
  }

}
