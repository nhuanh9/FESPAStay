import {Component, OnInit} from '@angular/core';
import {Room} from '../../../../../model/room';
import {Subscription} from 'rxjs';
import {Order} from '../../../../../model/order';
import {CommentToRoom} from '../../../../../model/comment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../../../Services/room.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../../../../../Services/authentication.service';
import {UserService} from '../../../../../Services/user.service';
import {ServicesService} from "../../../../../Services/services.service";
import {Services} from "../../../../../model/services";
import {OrderService} from "../../../../../Services/order.service";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  sub: Subscription;
  orders: Order[];
  comments: CommentToRoom[];
  comment: CommentToRoom;
  oneDay = 86400000;
  currentTime = new Date();
  constructor(private orderService: OrderService,
              private  router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    this.orderService.getAll().subscribe(result => {
      this.orders = result;
      console.log(result);
    })
  }

  deleteOrder(order) {
    const orderTime = new Date(order.startDate);
    const orderTimeSecond = orderTime.getTime() - this.currentTime.getTime();
    console.log(orderTimeSecond - this.oneDay);
    console.log(orderTimeSecond);
    if (orderTimeSecond > this.oneDay || orderTimeSecond < 0) {
      const id = order.idOrder;
        this.orderService.delete(id).subscribe(() => {
          alert('Thành Công!');
          location.reload();
        }, error => {
          console.log('Loi! ' + error.toString());
          alert('Thành Công!');
          // location.reload();
        });
    } else {
      alert('Bạn không thể xoá đơn này do còn ít hơn 1 ngày!');
    }
  }
}
