import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  car: any;
  readonly CAR_TYPE = [ 'Sedan', 'SUV', 'Truck', 'Van' ];
  readonly GEAR_TYPE = ['Auto', 'Manual']
  image: any;
  addCarForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    type: new FormControl('', [Validators.required]),
    gear: new FormControl('', [Validators.required]),
    insurance: new FormControl(''),
    pickupLoc: new FormControl('', [Validators.required, Validators.minLength(10)]),
    passengers: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),  Validators.max(10), Validators.min(2)]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
    image: new FormControl('', [Validators.required]),
    imageSource: new FormControl('', [Validators.required])
  });

  constructor(
    private carService: CarService, 
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() { }

  get f(){
    return this.addCarForm.controls;
  }

  changeType(e: any): void {
    this.addCarForm.get('type')?.setValue(e.target.value);
  }

  changeGear(e: any): void {
    this.addCarForm.get('gear')?.setValue(e.target.value);
  }

  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
      this.addCarForm.patchValue({
        imageSource: this.image
      });
    }
  }

  submit(): void {    
    const user: any = localStorage.getItem('user');
    const parsedUser: any = JSON.parse(user);

    if(!this.addCarForm.invalid) {
      const formData = new FormData();
      if (this.image) formData.append('image', this.addCarForm.get('imageSource')!.value!);
      this.car = this.addCarForm.value;
      const payload = { ...this.car, user: parsedUser }
      this.carService.addCar(payload);
    }
    setTimeout(() => {
      this.router.navigate(['/car-list']);
    });
  }

}
