import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {Subscription} from 'rxjs';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RoomService} from '../../../../Services/room.service';
import {Room} from '../../../../model/room';

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.scss']
})
export class DetailHouseComponent implements OnInit {

  house: House;
  sub: Subscription;
  rooms: Room[];

  constructor(private houseService: HouseService,
              private activateRoute: ActivatedRoute,
              private  roomService: RoomService) {
  }

  ngOnInit() {
    this.house = {
      nameHouse: ' '
    }
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
      }, error1 => {
        console.log(error1);
      });
      this.roomService.getList().subscribe(next => {
        this.rooms = next;
        console.log(this.rooms);
      }, error => {
        console.log(error);
      });
    });
  }

  bookHouse() {
    this.houseService.edit(this.house, this.house.id).subscribe(() => {
      console.log('Edit Thành công!');
    }, error1 => {
      console.log('Lỗi ' + error1);
    });
  }


}
