import {Component, OnInit} from '@angular/core';
import {House} from '../../../../../model/House';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../../../../model/room';
import {Subscription} from 'rxjs';
import {CategoryHouse} from '../../../../../model/categoryHouse';
import {HouseService} from '../../../../../Services/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {CategoryHouseService} from '../../../../../Services/category-house.service';
import {AuthenticationService} from '../../../../../Services/authentication.service';
import {UserService} from '../../../../../Services/user.service';
import {RoomService} from '../../../../../Services/room.service';
import * as firebase from 'firebase';
import {Order} from '../../../../../model/order';
import {OrderService} from '../../../../../Services/order.service';
import {User} from "../../../../../model/user";
import {HouseDayService} from "../../../../../Services/house-day.service";
import {HouseDay} from "../../../../../model/houseDay";
import {Services} from "../../../../../model/services";
import {ServicesService} from "../../../../../Services/services.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {


  house: House;
  arrayPicture = '';
  createForm: FormGroup;
  room: Room;
  sub: Subscription;
  order: Order;
  currentUser: User;
  currentTime = new Date();
  houseDays: HouseDay[];
  listOrder: Order[];
  oneDay = 86400000;
  services: Services[];
  servicesSelected: any[];

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryHouse: CategoryHouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private activateRoute: ActivatedRoute,
              private roomService: RoomService,
              private orderService: OrderService,
              private houseDayService: HouseDayService,
              private servicesService: ServicesService
  ) {
  }

  ngOnInit() {
    this.getDetailHouse();
    this.prepareForm();
    // this.getListHouseDay();
    // this.getListOrder();
    this.getServices()
    this.servicesSelected = [];
  }
  private  getServices() {
    this.servicesService.getAll().subscribe( result => {
      this.services = result;
      console.log(this.services);
    },error => {
      console.log("Lỗi service: ");
      console.log(error);
    })
  }
  private getDetailHouse() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  private getListHouseDay() {
    this.houseDayService.getAll().subscribe(result => {
      console.log(result)
      this.houseDays = result;
      console.log(this.houseDays);
    })
  }

  private getListOrder() {
    this.orderService.getAll().subscribe(result => {
      console.log(result)
      this.listOrder = result;
    })
  }

  private prepareForm() {
    this.createForm = this.fb.group({
      nameGuest: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      formDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      services: this.fb.array([])
    });
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.createForm.get('services') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      // @ts-ignore
      this.servicesSelected.push({idService: (new FormControl(e.target.value)).value});
      console.log(this.servicesSelected);
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  createOrder() {
    this.setNewOrder();
    console.log(this.order);
    let flag = true;
    let newOrder = this.order;
    let orderService = this.orderService;
    this.orderService.getAll().subscribe(result => {
      result.forEach(function (value) {
        if (newOrder.house.idHouse == value.house.idHouse && (newOrder.startDate < value.startDate || newOrder.endDate < value.startDate || newOrder.startDate < value.endDate || newOrder.endDate < value.endDate)) {
          flag = false;
        }

      })
      if (flag) {
        this.orderService.createOrder(this.order).subscribe(() => {
          alert("Tạo hoá đơn thành công!");
          this.router.navigate(['/user/house/orders']);
        }, error => {
          console.log("Lỗi: " + error);
        });
      } else {
        alert("Đã có người đặt nhà trong khoảng thời gian: " + this.order.startDate + " đến: " + this.order.endDate + ", vui lòng chọn thời gian khác hoặc nhà phù hợp hơn!");
      }
    })

  }

  private setNewOrder() {
    this.order = {
      personName: this.createForm.get('nameGuest').value,
      telephoneNumber: this.createForm.get('phoneNumber').value,
      startDate: this.createForm.get('formDate').value,
      endDate: this.createForm.get('toDate').value,
      bookingDate: Date.now().toString(),
      account: 'admin',
      house: this.house,
      services: this.servicesSelected
    };
  }
}
