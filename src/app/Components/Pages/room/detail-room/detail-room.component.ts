import {Component, OnInit} from '@angular/core';
import {Room} from '../../../../model/room';
import {RoomService} from '../../../../Services/room.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Order} from '../../../../model/order';
import {CommentToRoom} from '../../../../model/comment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {UserService} from '../../../../Services/user.service';
import {RatingService} from "../../../../Services/rating.service";
import {Rating} from "../../../../model/rating";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.scss']
})
export class DetailRoomComponent implements OnInit {
  p = 1;
  room: Room;
  sub: Subscription;
  orders: Order[];
  comments: CommentToRoom[];
  commentForm: FormGroup;
  comment: CommentToRoom;
  currentRate = 8;
  ratingForRoom: Rating;
  currentRatings: Rating[];
  avgCurrentRatings: number;
  currentUser: User;

  constructor(private roomService: RoomService,
              private  router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private ratingService: RatingService
  ) {
  }

  getAllCommentsAndRating() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.roomService.detail(id).subscribe(next => {
        this.room = next;
        this.orders = this.room.orderForms;
        this.comments = this.room.listComment;
        this.comments.sort((a, b) => {
          const id1 = parseInt(a.id, 10);
          const id2 = parseInt(b.id, 10);
          return id1 - id2;
        })
        console.log(this.comments);
        this.getRatingByHouseId(this.room.id);
      }, error1 => {
        console.log(error1);
      });
    });
  }

  private getRatingByHouseId(id) {
    this.ratingService.getAllByHouseId(id).subscribe(value => {
      console.log(value);
      this.currentRatings = value;
      this.avgCurrentRatings = this.getAvgRatings(this.currentRatings);
    })
  }

  getAvgRatings(ratings) {
    let avgRate = 0;
    for (let i = 0; i < ratings.length; i++) {
      avgRate += Number(ratings[i].rate);
    }
    avgRate = avgRate / ratings.length;
    return avgRate;
  }

  prepareFormComment() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]]
    });
  }

  getCurrentUser() {
    this.authenticationService.currentUser.subscribe(value => {
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.currentUser = result;
      });
    });
  }

  ngOnInit() {
    this.room = {
      id: ''
    }
    this.comments = [];
    this.currentUser = {
      imageUrls: ''
    }
    this.getCurrentUser();
    this.getAllCommentsAndRating();
    this.prepareFormComment();
  }

  addComment() {
    this.authenticationService.currentUser.subscribe(value => {
      this.setNewComment();
      console.log(this.comment);
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.comment.username = result.username;
        this.comment.imageUrls = result.imageUrls;
        this.roomService.addComment(this.room.id, this.comment).subscribe(() => {
          this.getAllCommentsAndRating();
          this.prepareFormComment();
        }, error1 => {
          console.log('Lỗi ' + error1);
        });
      });
    });
  }

  private setNewComment() {
    this.comment = {
      comment: this.commentForm.get('comment').value
    };
  }

  rateRoom() {
    this.ratingForRoom = {
      houseId: this.room.id,
      rate: this.currentRate.toString()
    }
    this.ratingService.create(this.ratingForRoom).subscribe(result => {
      alert("Cảm ơn bạn đã đánh giá!");
      this.getAllCommentsAndRating();
    }, error => {
      console.log("Lỗi!");
    })
  }
}

