import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
import {Subscription} from 'rxjs';
import {Order} from '../../../../model/order';
import {House} from '../../../../model/House';
import {UserService} from '../../../../Services/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  sub: Subscription;
  userFirstName = '';
  userLastName = '';
  userGender = '';
  userPhoneNumber = '';
  userEmail = '1';
  arrayPicture = '';
  userOrders: Order[];
  userHouses: House[];

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private activatedRoute: ActivatedRoute) {
  }

  userForm: FormGroup = this.fb.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.currentUser = {
      id: 1,
      firstName: 'a',
      lastName: 'b'
    }
    this.getUserProfile();
  }

  getUserProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.getUserProfileById(id);
    });
  }

  private getUserProfileById(id: string) {
    this.userService.getUserProfile(id).subscribe(value => {
      this.currentUser = value;
      this.userFirstName = this.currentUser.firstName;
      this.userLastName = this.currentUser.lastName;
      this.userGender = this.currentUser.gender;
      this.userPhoneNumber = this.currentUser.phoneNumber;
      this.userEmail = this.currentUser.email;
      this.arrayPicture = this.currentUser.imageUrls;
      this.userOrders = this.currentUser.listOrder;
      this.userHouses = this.currentUser.houseList;
    }, () => {
      console.log('Loi' + this.arrayPicture);
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
      () => {
        console.log('Error');
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
