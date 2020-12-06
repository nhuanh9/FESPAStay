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

  getAllCategoryHouse() {
    this.categoryHouseService.getAll().subscribe(next => {
      this.listCategoryHouse = next;
    });
  }

  getAllHouse() {
    this.houseService.getAll().subscribe(result => {
      this.listHouse = result;
    }, error => {
      console.log('Loi!');
    });
  }

  ngOnInit() {
    this.getAllHouse();
    this.getAllCategoryHouse();

  }


  getAllByCategory(category) {
    this.houseService.getAllByCategory(category).subscribe(value => {
      this.listHouse = value;
      if (this.listHouse.length == 0) {
        // alert("Loại: " + category + " không có kết quả nào!");
        this.message = false;
      } else {
        this.message = true;
      }
      console.log(value);
    }, error => {
      console.log(error);
    })
  }
}
