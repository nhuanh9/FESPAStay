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
  message = true;
  houseImages: HouseImages[];

  constructor(private houseService: HouseService,
              private activateRoute: ActivatedRoute,
              private  roomService: RoomService,
              private houseImagesService: HouseImagesService) {
  }

  getImageById(id) {
    this.houseImagesService.getImagesByIdHouse(id).subscribe(value => {
      this.houseImages = value;
      console.log(this.houseImages);
    }, error => {
      console.log("Lỗi " + error);
    })
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
        this.getImageById(this.house.id);
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

  addImage() {
    if (this.arrayPicture == '') {
      this.message = false;
    } else {
      this.message = true;
      this.image = {
        url: this.arrayPicture,
        houseId: this.house.id
      }
      this.houseImagesService.create(this.image).subscribe(value => {
        alert("Thêm ảnh thành công!");
        this.getImageById(this.house.id);
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
