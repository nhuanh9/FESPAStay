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
import {CategoryHouse} from "../../../../model/categoryHouse";
import {CategoryHouseService} from "../../../../Services/category-house.service";

@Component({
  selector: 'app-list-your-house',
  templateUrl: './list-your-house.component.html',
  styleUrls: ['./list-your-house.component.scss']
})
export class ListYourHouseComponent implements OnInit {

  p = 1;
  listHouse: House[];
  listCategoryHouse: CategoryHouse[];
  nameHouse: string[];
  currentUser: User;
  message = true;

  constructor(private houseService: HouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private categoryHouseService: CategoryHouseService) {
  }
  ngOnInit() {
    this.categoryHouseService.getAll().subscribe(next => {
      this.listCategoryHouse = next;
    });
  }
}
