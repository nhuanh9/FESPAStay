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



  ngOnInit() {
    this.house = {
      name: ' '
    }
    this.getImages();
  }

  private getImages() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
      }, error1 => {
        console.log(error1);
      });
    });
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
