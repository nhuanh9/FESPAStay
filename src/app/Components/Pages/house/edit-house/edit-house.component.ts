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
import {RoomService} from '../../../../Services/room.service';
import {Subscription} from 'rxjs';
import {Room} from '../../../../model/room';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.scss']
})
export class EditHouseComponent implements OnInit {


  house: House;
  arrayPicture = '';
  editForm: FormGroup;
  sub: Subscription;
  rooms: Room[];
  idHouse: any;
  listCategoryHouse: CategoryHouse[];
  categoryHouse: CategoryHouse;

  constructor(private houseService: HouseService,
              private  router: Router,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private categoryHouseService: CategoryHouseService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private activateRoute: ActivatedRoute,
              private  roomService: RoomService
  ) {
  }

  prepareForm() {
    this.editForm = this.fb.group({
      hostName: ['', [Validators.required]],
      nameHouse: ['', [Validators.required]],
      categoryHouse: ['', [Validators.required]],
      address: ['', [Validators.required]],
      amountBathRoom: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  getAllCategoryHouse() {
    this.categoryHouseService.getAll().subscribe(next => {
      this.listCategoryHouse = next;
    });
  }

  getOldHouse(id) {
    this.houseService.detail(id).subscribe(next => {
      this.house = next;
      this.idHouse = this.house.idHouse;
    });
  }


  getHouse() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.getOldHouse(id);
    });
  }

  ngOnInit() {
    this.getHouse();
    this.prepareForm();
    this.getAllCategoryHouse();
  }

  setCategoryForFormData() {
    // tslint:disable-next-line:prefer-for-of
    let newCategoryHouse = this.editForm.get('categoryHouse').value;
    console.log(newCategoryHouse)
    if (newCategoryHouse === '') {
      this.categoryHouse = this.house.categoryHouse;
    } else {
      for (let i = 0; i < this.listCategoryHouse.length; i++) {
        if (this.listCategoryHouse[i].id == newCategoryHouse) {
          this.categoryHouse = this.listCategoryHouse[i];
        }
      }
    }
  }

  setNewHouse() {
    let house: House = {
      account: this.editForm.get('hostName').value,
      name: this.editForm.get('nameHouse').value,
      categoryHouse: this.categoryHouse,
      roomNumber: this.editForm.get('amountBathRoom').value,
      address: this.editForm.get('address').value,
      description: this.editForm.get('description').value,
      price: this.arrayPicture,
      imageList: [{
        link: ''
      }]
    };
    return house;
  }

  editHouse() {
        this.setCategoryForFormData();
        this.houseService.edit(this.setNewHouse(), this.idHouse).subscribe(() => {
          alert('Sửa thành công!');
          this.router.navigate(['/user/house/detail-your-house/' + this.house.idHouse]);
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
