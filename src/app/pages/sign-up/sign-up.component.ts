import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  preview: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        DOB: ['', Validators.required],
        address: this.formBuilder.group({
          street: [''],
          city: [''],
          country: [''],
        }),
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        driverLicense: this.formBuilder.group({
          number: [
            '',
            [
              Validators.required,
              Validators.minLength(7),
              Validators.maxLength(8),
            ],
          ],
          countryIssued: ['', Validators.required],
          dateIssued: ['', Validators.required],
        }),
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        // }
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // this.userService.
    console.log(JSON.stringify(this.registerForm.value));
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get getDOB() {
    return this.registerForm.get('DOB');
  }

  get getPhone() {
    return this.registerForm.get('phone');
  }
  get dateIssued() {
    return this.registerForm.get('driverLicense.dateIssued');
  }
  get countryIssued() {
    return this.registerForm.get('driverLicense.countryIssued');
  }

  get driverLicenseNumber() {
    return this.registerForm.get('driverLicense.number');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  private passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }
}
