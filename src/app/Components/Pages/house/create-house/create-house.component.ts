import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../../../Services/house.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {House} from '../../../../model/House';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryHouse} from '../../../../model/categoryHouse';
import {CategoryRoom} from '../../../../model/categoryRoom';
import {CategoryHouseService} from '../../../../Services/category-house.service';
import {CategoryRoomService} from '../../../../Services/category-room.service';
import {AuthenticationService} from '../../../../Services/authentication.service';
import {UserService} from '../../../../Services/user.service';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.scss']
})
export class CreateHouseComponent implements OnInit {

  house: House;
  arrayPicture = '';
  createForm: FormGroup;
  currentUser: User;
  listCategoryHouse: CategoryHouse[];

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryHouse: CategoryHouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService
              // private categoryRoom: CategoryRoomService,
  ) {
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      hostName: ['', [Validators.required]],
      nameHouse: ['', [Validators.required]],
      categoryHouse: ['', [Validators.required]],
      // categoryRoom: ['', [Validators.required]],
      address: ['', [Validators.required]],
      amountBathRoom: ['', [Validators.required]],
      amountBedRoom: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.categoryHouse.getList().subscribe(next => {
      this.listCategoryHouse = next;
    });
  }

  transferFormData() {
    this.authenticationService.currentUser.subscribe(value => {
      this.house = {
        hostName: this.createForm.get('hostName').value,
        nameHouse: this.createForm.get('nameHouse').value,
        categoryHouse: {
          id: this.createForm.get('categoryHouse').value
        },
        amountBathRoom: this.createForm.get('amountBathRoom').value,
        amountBedRoom: this.createForm.get('amountBedRoom').value,
        address: this.createForm.get('address').value,
        description: this.createForm.get('description').value,
        imageUrls: this.arrayPicture
      };
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.house.hostName = result.username;
      });
    });
  }

  createHouse() {
    this.authenticationService.currentUser.subscribe(value => {
      this.house = {
        hostName: this.createForm.get('hostName').value,
        nameHouse: this.createForm.get('nameHouse').value,
        categoryHouse: {
          id: this.createForm.get('categoryHouse').value
        },
        // categoryRoom: this.createForm.get('categoryRoom').value,
        amountBathRoom: this.createForm.get('amountBathRoom').value,
        amountBedRoom: this.createForm.get('amountBedRoom').value,
        address: this.createForm.get('address').value,
        description: this.createForm.get('description').value,
        imageUrls: this.arrayPicture
      };
      this.userService.userDetail(value.id + '').subscribe(result => {
        this.house.hostName = result.username;
        // this.house.user = result;
        this.currentUser = result;
        console.log(this.house);
        this.houseService.create(this.currentUser.id, this.house).subscribe(() => {
          alert('Thêm thành công!');
          this.router.navigate(['/']);
        }, error1 => {
          console.log('Lỗi ' + error1);
        });
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
