import { Component, OnInit } from '@angular/core';
import {Room} from '../../../../model/room';
import {Subscription} from 'rxjs';
import {Order} from '../../../../model/order';
import {CommentToRoom} from '../../../../model/comment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../../Services/room.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {UserService} from '../../../../Services/user.service';

@Component({
  selector: 'app-detail-your-rooms',
  templateUrl: './detail-your-rooms.component.html',
  styleUrls: ['./detail-your-rooms.component.scss']
})
export class DetailYourRoomsComponent implements OnInit {


  room: Room;
  sub: Subscription;
  orders: Order[];
  comments: CommentToRoom[];
  commentForm: FormGroup;
  comment: CommentToRoom;
  constructor(private roomService: RoomService,
              private  router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,) {
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.roomService.detail(id).subscribe(next => {
        this.room = next;
        this.orders = this.room.orderForms;
        this.comments = this.room.listComment;
        console.log(this.orders);
      }, error1 => {
        console.log(error1);
      });
    });
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]]
    });
  }

  addComment() {
    this.authenticationService.currentUser.subscribe(value => {
      this.comment = {
        comment: this.commentForm.get('comment').value
      };
      console.log(this.comment);
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.comment.username = result.username;
        this.comment.imageUrls = result.imageUrls;
        this.roomService.addComment(this.room.id, this.comment).subscribe(() => {
          location.reload(true);
        }, error1 => {
          console.log('Lỗi ' + error1);
        });
      });
    });
  }

}
