import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {HouseService} from '../../../../Services/house.service';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {User} from '../../../../model/user';
import {UserService} from '../../../../Services/user.service';
import {CategoryHouseService} from "../../../../Services/category-house.service";
import {CategoryHouse} from "../../../../model/categoryHouse";

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.scss']
})
export class ListHouseComponent implements OnInit {
  // listHouse: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  getListCategoryHouse() {
    this.categoryHouseService.getList().subscribe(next => {
      this.listCategoryHouse = next;
    });
  }

  getListHouse() {
    this.houseService.getList().subscribe(result => {
      this.listHouse = result;
    }, error => {
      console.log('Loi!');
    });
  }

  ngOnInit() {
    this.getListHouse();
    this.getListCategoryHouse();
    this.authenticationService.currentUser.subscribe(value => {
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.currentUser = result;
      });
    });

  }

  searchByCategory(category) {
    this.houseService.searchCategory(category).subscribe(value => {
      this.listHouse = value;
      if (this.listHouse.length == 0) {
        // alert("Loại: " + category + " không có kết quả nào!");
        this.message = false;
      }
      console.log(value);
    }, error => {
      console.log(error);
    })
  }
}
