import {CommentToRoom} from './comment';

export interface Order {
  idOrder?: string;
  personName?: string;
  telephoneNumber?: string;
  bookingDate?: string;
  startDate?: string;
  endDate?: string;
  account?: string;
  house?: any;
  services?: any;
  servicePrice?: any;
  housePrice?: any;
  totalPrice?: any;
}
