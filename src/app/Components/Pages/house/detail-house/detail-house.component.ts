import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {Subscription} from 'rxjs';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RoomService} from '../../../../Services/room.service';
import {Room} from '../../../../model/room';
import * as firebase from "firebase";
import {HouseImages} from "../../../../model/houseImages";
import {HouseImagesService} from "../../../../Services/house-images.service";

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.scss']
})
export class DetailHouseComponent implements OnInit {

  house: House;
  sub: Subscription;
  rooms: Room[];
  arrayPicture = '';
  image: HouseImages;
  message = true;
  houseImages: HouseImages[];
  sizeOfRoomsIsZero = true;

  constructor(private houseService: HouseService,
              private activateRoute: ActivatedRoute,
              private  roomService: RoomService,
              private houseImagesService: HouseImagesService) {
  }

  getImageById(id) {
    this.houseImagesService.getAllByIdHouse(id).subscribe(value => {
      this.houseImages = value;
      console.log(this.houseImages);
    }, error => {
      console.log("Lỗi " + error);
    })
  }

  getAllByHouseName(houseName) {
    this.roomService.getAllByHouseName(houseName).subscribe(value => {
      this.rooms = value;
      if (this.rooms.length === 0) {
        this.sizeOfRoomsIsZero = false;
      } else {
        this.sizeOfRoomsIsZero = true;
      }
    })
  }

  ngOnInit() {
    this.house = {
      name: ' '
    }
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
        this.getImageById(this.house.idHouse);
        this.getAllByHouseName(this.house.name);
      }, error1 => {
        console.log(error1);
      });
    });
  }

}
