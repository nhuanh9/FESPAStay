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
  categoryHouse: CategoryHouse;

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryHouseService: CategoryHouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService
  ) {
  }

  prepareForm() {
    this.createForm = this.fb.group({
      hostName: ['', [Validators.required]],
      nameHouse: ['', [Validators.required]],
      categoryHouse: ['', [Validators.required]],
      price: ['', [Validators.required]],
      address: ['', [Validators.required]],
      amountBathRoom: ['', [Validators.required]],
      amountBedRoom: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  getListCategoryHouse() {
    this.categoryHouseService.getAll().subscribe(next => {
      this.listCategoryHouse = next;
    });
  }

  ngOnInit() {
    this.prepareForm();
    this.getListCategoryHouse();
  }

  setCategoryForFormData() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listCategoryHouse.length; i++) {
      if (this.listCategoryHouse[i].id == this.createForm.get('categoryHouse').value) {
        this.categoryHouse = this.listCategoryHouse[i];
      }
    }
  }

  setNewHouse() {
    this.house = {
      account: this.createForm.get('hostName').value,
      name: this.createForm.get('nameHouse').value,
      categoryHouse: this.categoryHouse,
      roomNumber: this.createForm.get('amountBathRoom').value,
      address: this.createForm.get('address').value,
      description: this.createForm.get('description').value,
      price: this.createForm.get('price').value,
      imageList: [{
        link: ''
      }],
      imageUrls : this.arrayPicture
    };
  }

  returnHome() {
    this.router.navigate(['/']);
  }

  createHouse() {
      this.setCategoryForFormData();
      this.setNewHouse();
      console.log(this.house)
      this.houseService.create(this.house).subscribe(() => {
        alert('Thêm thành công!');
        this.returnHome();
      }, error1 => {
        console.log('Lỗi ' + error1);
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
