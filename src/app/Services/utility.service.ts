import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Services} from "../model/services";
import {Utility} from "../model/utility";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  API_URL = environment.apiUrl + '/utilities';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Utility[]> {
    return this.http.get<Utility[]>(this.API_URL);
  }
}
