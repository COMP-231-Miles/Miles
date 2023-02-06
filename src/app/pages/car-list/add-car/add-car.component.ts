import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  car: any;
  readonly CAR_TYPE = [ 'Sedan', 'SUV', 'Truck', 'Van' ];
  image: any;
  addCarForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    type: new FormControl('', [Validators.required]),
    pickupLoc: new FormControl('', [Validators.required, Validators.minLength(10)]),
    passengers: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),  Validators.max(10), Validators.min(2)]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
    image: new FormControl('', [Validators.required]),
    imageSource: new FormControl('', [Validators.required])
  });
  constructor() { }

  ngOnInit() {

  }

  get f(){
    return this.addCarForm.controls;
  }

  changeType(e: any) {
    this.addCarForm.get('type')?.setValue(e.target.value, {
      onlySelf: true,
    });
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
    const formData = new FormData();
    if(this.image) formData.append('image', this.addCarForm.get('imageSource')!.value!);


    this.car = this.addCarForm.value;
  }
}
