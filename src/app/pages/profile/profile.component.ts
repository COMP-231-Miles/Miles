import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { passwordMatchValidator } from 'src/app/helper/password-validator';
import { DriverLicense } from 'src/app/models/driverLicense.interface';
import { Address } from './../../models/address.interface';
import { UserService } from './../../services/user.service';
interface UpdateInfoProps {
  userInfo: boolean;
  password: boolean;
  driverLicense: boolean;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  address: Address;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  //Todo - refactor: move edit panels to separate components
  profile: any;
  userInfo: UserInfo;
  driverLicense: DriverLicense;
  passwordForm: FormGroup;
  updateInfoPops: UpdateInfoProps = {
    userInfo: false,
    password: false,
    driverLicense: false,
  };
  checkCurrentPassword: boolean;
  submitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.toastr.info('callled!');

    this.userService.currentUserSource$.pipe(take(1)).subscribe(profile => {
      this.profile = profile;
    });

    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: passwordMatchValidator }
    )
  }

  callEditMode(edit: string): void {
    switch (edit) {
      case 'userInfo':
        this.updateInfoPops.userInfo = !this.updateInfoPops.userInfo;
        break;
      case 'password':
        this.updateInfoPops.password = !this.updateInfoPops.password;
        break;
      case 'driverLicense':
        this.updateInfoPops.driverLicense = !this.updateInfoPops.driverLicense;
        break;
    }
  }

  updateUserInfo(): void {
    const payload = {
      _id: this.profile._id,
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      phone: this.profile.phone,  
      address: this.profile.address,
    };
    this.userService
      .updateUserInfo(this.profile._id, payload)
      .subscribe(res => {
        if (res.data) {
          this.updateInfoPops.userInfo = !this.updateInfoPops.userInfo;
        }
      });
  }

  updateDriverLicense() {
    const payload = {
      _id: this.profile._id,
      driverLicense: this.profile.driverLicense
    };
    this.userService
    .updateDriverLicense(this.profile._id, payload)
    .subscribe(res => {
      if (res.data) {
        this.updateInfoPops.driverLicense = !this.updateInfoPops.driverLicense;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.passwordForm.get('currentPassword')?.value !== this.profile.password) {
      this.checkCurrentPassword = false;
    }
    if (this.passwordForm.invalid) {
      return;
    }
    this.checkCurrentPassword = true;
    this.resetPassword();
  }

  private resetPassword() {
    const payload = {
      _id: this.profile._id,
      password: this.passwordForm.get('confirmPassword')?.value
    };

    this.userService
    .updateDriverLicense(this.profile._id, payload)
    .subscribe(res => {
      if (res.data) {
        this.updateInfoPops.password = !this.updateInfoPops.password;
        this.toastr.success('Password updated!');
      }
    });
  }

  get currentPassword() {
    return this.passwordForm.get('currentPassword');
  }
  get newPassword() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }
}
