import { Address } from './../../models/address.interface';
import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DriverLicense } from 'src/app/models/driverLicense.interface';
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
  profile: any;
  userInfo: UserInfo;
  driverLicense: DriverLicense;
  password: string;
  updateInfoPops: UpdateInfoProps = {
    userInfo: false,
    password: false,
    driverLicense: false,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUserSource$.pipe(take(1)).subscribe(profile => {
      this.profile = profile;
    });
  }

  callEditMode(edit: string) {
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

  updateUserInfo() {
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
}
