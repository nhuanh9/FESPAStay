import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../model/room';
import {Order} from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  API_URL = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL);
  }

  createOrder(order): Observable<Order> {
    return this.http.post<Order>(this.API_URL, order);
  }

  delete(id: string): Observable<Order> {
    return this.http.delete<Order>(this.API_URL + `/${id}`);
  }

  getAllByHouseName(houseName: string): Observable<Order[]> {
    return this.http.post<Order[]>(this.API_URL + `/search-by-house-name`, houseName);
  }

  getAllByGuestName(guestName: string): Observable<Order[]> {
    return this.http.post<Order[]>(this.API_URL + `/search-by-guest-name`, guestName);
  }

  getAllByUserId(userId: number): Observable<Order[]> {
    return this.http.post<Order[]>(this.API_URL + `/search-by-user-id`, userId);
  }

}
