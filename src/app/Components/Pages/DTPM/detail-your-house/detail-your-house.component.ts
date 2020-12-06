import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {Subscription} from 'rxjs';
import {Room} from '../../../../model/room';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RoomService} from '../../../../Services/room.service';
import * as firebase from "firebase";
import {HouseImagesService} from "../../../../Services/house-images.service";
import {HouseImages} from "../../../../model/houseImages";

@Component({
  selector: 'app-detail-your-house',
  templateUrl: './detail-your-house.component.html',
  styleUrls: ['./detail-your-house.component.scss']
})
export class DetailYourHouseComponent implements OnInit {
  house: House;
  sub: Subscription;
  rooms: Room[];
  arrayPicture = '';
  image: HouseImages;
  sizeOfHouseImagesIsZero = true;
  houseImages: HouseImages[];
  sizeOfRoomsIsZero = true;

  constructor(private houseService: HouseService,
              private activateRoute: ActivatedRoute,
              private  roomService: RoomService,
              private houseImagesService: HouseImagesService) {
  }

  getImageByHouseId(id) {
    this.houseImagesService.getAllByIdHouse(id).subscribe(value => {
      this.houseImages = value;
      console.log(this.houseImages);
    }, error => {
      console.log("Lỗi " + error);
    })
  }

  getRoomsByHouseName(houseName) {
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
    this.getImagesAndRooms();
  }

  private getImagesAndRooms() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
        this.getImageByHouseId(this.house.idHouse);
        this.getRoomsByHouseName(this.house.name);
      }, error1 => {
        console.log(error1);
      });
    });
  }

  addImage() {
    if (this.arrayPicture == '') {
      this.sizeOfHouseImagesIsZero = false;
    } else {
      this.sizeOfHouseImagesIsZero = true;
      this.image = {
        url: this.arrayPicture,
        houseId: this.house.idHouse
      }
      this.houseImagesService.create(this.image).subscribe(value => {
        alert("Thêm ảnh thành công!");
        this.getImageByHouseId(this.house.idHouse);
        this.arrayPicture = ''
      }, error => {
        console.log("Lỗi " + error);
      })
    }
  }

  saveImg(value) {
    const file = value.target.files;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.arrayPicture += downloadURL + ' ';
          console.log(this.arrayPicture);
        });
      }
    );
  }

}
