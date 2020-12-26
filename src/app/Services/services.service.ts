import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryRoom} from "../model/categoryRoom";
import {Services} from "../model/services";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  API_URL = environment.apiUrl + '/services';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Services[]> {
    return this.http.get<Services[]>(this.API_URL);
  }
}
