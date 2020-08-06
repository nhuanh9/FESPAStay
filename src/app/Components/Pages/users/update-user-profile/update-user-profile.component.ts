import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../Services/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {User} from '../../../../model/user';
import {Subscription} from 'rxjs';
import {error} from 'util';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Order} from '../../../../model/order';
import {House} from '../../../../model/House';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {
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
      lastName: 'b',
      imageUrls: ''
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

  updateUserProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.userService.getUserProfile(id).subscribe(value => {
        this.currentUser = value;
        const user: User = {
          id: this.currentUser.id,
          firstName: this.userForm.get('firstName').value,
          lastName: this.userForm.get('lastName').value,
          gender: this.userForm.get('gender').value,
          phoneNumber: this.userForm.get('phoneNumber').value,
          email: this.userForm.get('email').value,
          imageUrls: this.arrayPicture,
          houseList: this.userHouses,
          listOrder: this.userOrders
        };
        if (user.firstName === '') {
          user.firstName = this.userFirstName;
        }
        if (user.lastName === '') {
          user.lastName = this.userLastName;
        }
        if (user.gender === '') {
          user.gender = this.userGender;
        }
        if (user.phoneNumber === '') {
          user.phoneNumber = this.userPhoneNumber;
        }
        if (user.email === '') {
          user.email = this.userEmail;
        }
        this.userService.updateUserProfile(this.currentUser.id, user).subscribe(() => {
          alert('Cap nhat thanh cong');
          this.router.navigate(['/user/profile/' + this.currentUser.id]);
          console.log(this.currentUser);
        }, () => {
          console.log('Loi');
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
