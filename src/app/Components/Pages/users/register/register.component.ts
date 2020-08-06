import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {element} from 'protractor';
import {UserHouse} from '../../../../model/userHouse';
import {UserService} from '../../../../Services/user.service';
import {Router} from '@angular/router';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  successMessage = '';
  failMessage = '';
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    const user = this.setNewUser();
    this.userService.register(user).subscribe(() => {
      console.log('Đăng ký thành công');
      this.registerForm.reset();
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
    console.log(user);
  }

  private setNewUser() {
    const user: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber,
      gender: this.registerForm.value.gender
    };
    return user;
  }
}
