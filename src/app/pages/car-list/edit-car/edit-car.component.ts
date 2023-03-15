import { take } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
})
export class EditCarComponent implements OnInit {
  car: any;
  editCarForm:FormGroup;
  readonly CAR_TYPE = ['Sedan', 'SUV', 'Truck', 'Van'];
  readonly GEAR_TYPE = ['Auto', 'Manual'];

  constructor(
    private route: ActivatedRoute, 
    private carService: CarService,
    private router: Router
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.carService
        .getCarById(params['id'])
        .pipe(take(1))
        .subscribe(car => {
          this.car = car.data;
          console.log(this.car);
          this.editCarForm = new FormGroup({
            name: new FormControl(this.car.name, [Validators.required, Validators.minLength(3)]),
            type: new FormControl(this.car.type, [Validators.required]),
            gear: new FormControl(this.car.gear, [Validators.required]),
            pickupLoc: new FormControl(this.car.pickupLoc, [Validators.required, Validators.minLength(10)]),
            passengers: new FormControl(this.car.passengers, [Validators.required, Validators.pattern("^[0-9]*$"),  Validators.max(10), Validators.min(2)]),
            price: new FormControl(this.car.price, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
            image: new FormControl(this.car.image, [Validators.required]),
          });
        });


    });
  }

  get f(){
    return this.editCarForm.controls;
  }

  changeType(e: any): void {
    this.editCarForm.get('type')?.setValue(e.target.value);
  }

  changeGear(e: any): void {
    this.editCarForm.get('gear')?.setValue(e.target.value);
  }

  submit(): void {    
    const user: any = localStorage.getItem('user');
    const parsedUser: any = JSON.parse(user);

    if(!this.editCarForm.invalid) {
      let postData: FormData;
        postData = {
          name: this.editCarForm.get('name')!.value!,
          type: this.editCarForm.get('type')!.value!,
          gear: this.editCarForm.get('gear')!.value!,
          insurance: this.editCarForm.get('insurance')!.value!,
          pickupLoc: this.editCarForm.get('pickupLoc')!.value!,
          passengers: this.editCarForm.get('passengers')!.value!,
          price: this.editCarForm.get('price')!.value!,
          image: this.car.image
        } as any;
      }
    setTimeout(() => {
      this.router.navigate(['/car-list']).then(() => {
        window.location.reload();
      });
    });
  }
}
