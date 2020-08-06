import {Component, OnInit} from '@angular/core';
import {House} from '../../../../model/House';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Room} from '../../../../model/room';
import {CategoryHouse} from '../../../../model/categoryHouse';
import {HouseService} from '../../../../Services/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {CategoryHouseService} from '../../../../Services/category-house.service';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {UserService} from '../../../../Services/user.service';
import {RoomService} from '../../../../Services/room.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {


  room: Room;
  arrayPicture = '';
  editForm: FormGroup;
  sub: Subscription;
  idRoom: any;

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryHouse: CategoryHouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private activateRoute: ActivatedRoute,
              private  roomService: RoomService
  ) {
  }

  ngOnInit() {
    this.getOldRoom();
    this.prepareForm();
  }

  private getOldRoom() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.roomService.detail(id).subscribe(next => {
        this.room = next;
        this.idRoom = this.room.id;
        this.arrayPicture = this.room.imageUrls;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  private prepareForm() {
    this.editForm = this.fb.group({
      hostName: ['', [Validators.required]],
      nameRoom: ['', [Validators.required]],
      priceRoom: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  editRoom() {
    this.authenticationService.currentUser.subscribe(value => {
      this.userService.userDetail(value.id + '').subscribe(result => {
        const room = this.setNewRoom();
        this.roomService.edit(room, this.idRoom).subscribe(() => {
          alert('Sửa thành công!');
          this.router.navigate(['/user/room/detail-your-room/' + this.room.id]);
        }, error1 => {
          console.log('Lỗi ' + error1);
        });
      });
    });
  }

  private setNewRoom() {
    const room: Room = {
      nameHouse: this.room.nameHouse,
      nameRoom: this.editForm.get('nameRoom').value,
      priceRoom: this.editForm.get('priceRoom').value,
      description: this.editForm.get('description').value,
      imageUrls: this.arrayPicture
    };
    return room;
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
          this.arrayPicture = downloadURL;
          console.log(this.arrayPicture);
        });
      }
    );
  }

}
