import {Component, OnInit} from '@angular/core';
import {Room} from '../../../../model/room';
import {Subscription} from 'rxjs';
import {Order} from '../../../../model/order';
import {CommentToRoom} from '../../../../model/comment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../../Services/room.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {UserService} from '../../../../Services/user.service';
import {House} from '../../../../model/House';
import {HouseService} from '../../../../Services/house.service';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-list-your-house',
  templateUrl: './list-your-house.component.html',
  styleUrls: ['./list-your-house.component.scss']
})
export class ListYourHouseComponent implements OnInit {

  listHouse: House[];
  sub: Subscription;
  currentUser: User;

  constructor(private houseService: HouseService,
              private  router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(value => {
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.currentUser = result;
        this.listHouse = this.currentUser.houseList;
      });
    });
  }
}
