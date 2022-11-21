import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/helper/password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      DOB: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
      phone: ['', Validators.required],
      driverLicense: this.formBuilder.group({
        number: ['', Validators.required],
        countryIssued: ['', Validators.required],
        dateIssued: ['', Validators.required],
      }),
      email: ['', Validators.email, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });
  }

  onSubmit(): void {

  }
}
