import {CommentToRoom} from './comment';

export interface Order {
  id?: string;
  nameGuest?: string;
  nameHouse?: string;
  roomName?: string;
  phoneNumber?: string;
  timeOrder?: string;
  formDate?: string;
  toDate?: string;
  total?: string;
  statusOder?: string;
  userId?: number;
}
