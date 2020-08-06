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

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  room: Room;
  sub: Subscription;
  orders: Order[];
  comments: CommentToRoom[];
  comment: CommentToRoom;

  constructor(private roomService: RoomService,
              private  router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.getOrderById(id);
    });
  }

  private getOrderById(id: string) {
    this.roomService.detail(id).subscribe(next => {
      this.room = next;
      this.orders = this.room.orderForms;
      console.log(this.orders);
    }, error1 => {
      console.log(error1);
    });
  }
}
