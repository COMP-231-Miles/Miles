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
    pickupLoc: new FormControl('', [Validators.required, Validators.minLength(10)]),
    passengers: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),  Validators.max(10), Validators.min(2)]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
    image: new FormControl('', [Validators.required]),
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
        image: this.image
      });
    }
  }

  submit(): void {    
    const user: any = localStorage.getItem('user');
    const parsedUser: any = JSON.parse(user);

    if(!this.addCarForm.invalid) {
      let postData: FormData;
      if (typeof this.image === 'object') {
        postData = new FormData();
        postData.append('name', this.addCarForm.get('name')!.value!);
        postData.append('type', this.addCarForm.get('type')!.value!);
        postData.append('gear', this.addCarForm.get('gear')!.value!);
        postData.append('pickupLoc', this.addCarForm.get('pickupLoc')!.value!);
        postData.append(
          'passengers',
          this.addCarForm.get('passengers')!.value!
        );
        postData.append('price', this.addCarForm.get('price')!.value!);
        postData.append(
          'image',
          this.image,
          this.addCarForm.get('name')!.value!
        );
        postData.append('user', parsedUser);
        postData.append('isAvailable', 'true');
      } else {
        postData = {
          name: this.addCarForm.get('name')!.value!,
          type: this.addCarForm.get('type')!.value!,
          gear: this.addCarForm.get('gear')!.value!,
          insurance: this.addCarForm.get('insurance')!.value!,
          pickupLoc: this.addCarForm.get('pickupLoc')!.value!,
          passengers: this.addCarForm.get('passengers')!.value!,
          price: this.addCarForm.get('price')!.value!,
          image: this.addCarForm.get('image')!.value!,
        } as any;
      }
      this.carService.addCar(postData);
    }
    setTimeout(() => {
      this.router.navigate(['/car-list']).then(() => {
        window.location.reload();
      });
    });
  }

}
