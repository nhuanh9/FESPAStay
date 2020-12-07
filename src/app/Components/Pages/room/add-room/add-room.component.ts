import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryHouse} from '../../../../model/categoryHouse';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {CategoryHouseService} from '../../../../Services/category-house.service';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {UserService} from '../../../../Services/user.service';
import * as firebase from 'firebase';
import {Room} from '../../../../model/room';
import {RoomService} from '../../../../Services/room.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {

  house: House;
  arrayPicture = '';
  createForm: FormGroup;
  room: Room;
  sub: Subscription;
  listCategoryHouse: CategoryHouse[];

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryHouse: CategoryHouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private activateRoute: ActivatedRoute,
              private roomService: RoomService
  ) {
  }

  ngOnInit() {
    this.getHouse();
    this.prepareForm();
  }

  private getHouse() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.houseService.detail(id).subscribe(next => {
        this.house = next;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  private prepareForm() {
    this.createForm = this.fb.group({
      hostName: ['', [Validators.required]],
      nameRoom: ['', [Validators.required]],
      priceRoom: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  createRoom() {
    this.authenticationService.currentUser.subscribe(value => {
      this.setNewRoom();
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.room.nameHost = result.username;
        this.houseService.createRoom(this.house.idHouse, this.room).subscribe(() => {
          alert('Thêm room thành công!');
          this.router.navigate(['/user/house/detail-house/' + this.house.idHouse]);
        }, error1 => {
          console.log('Lỗi ' + error1);
        });
      });
    });
  }

  private setNewRoom() {
    this.room = {
      nameHouse: this.house.name,
      nameRoom: this.createForm.get('nameRoom').value,
      priceRoom: this.createForm.get('priceRoom').value,
      description: this.createForm.get('description').value,
      imageUrls: this.arrayPicture
    };
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
