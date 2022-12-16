import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  pencil = faPencil;
  garbage = faTrashCan;

  isEdit: boolean = false;
  isAdd: boolean = false;

  carForm!: FormGroup;
  submitted = false;


  constructor(private carService: CarService, private formBuilder: FormBuilder) { 
    this.getCars();    
  }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      image: ['', Validators.required],
      passengers: ['', Validators.required],     
      price: ['', Validators.required],
      luggage: ['', Validators.required],
      location: ['', Validators.required],
      insurance: ['', Validators.required],  

    });
  }

  onAddCar(data: any)
  {
    this.submitted = true;
    if (this.carForm.invalid) {
      alert('Please, complete all the required fields before submitting.');
      return;
    }
    let carData: any = new FormData();
    carData.append('name', data.name); 
    carData.append('type', data.type);
    carData.append('passengers', data.passengers); 
    carData.append('price', data.price);  
    carData.append('luggage', data.luggage); 
    carData.append('pickupLoc', data.location); 
    carData.append('insurance', data.insurance); 
    carData.append('imageName', data.image);     

    this.carService.addCar(carData).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    });
    console.warn(data);
    alert('Your request has been successfully submitted.');
    location.reload();
    this.isAdd = false;
  }

  areCars: boolean = false;
  carList: any = []

  getCars() {
    this.carService.getCars2().subscribe(res => {
      this.carList = res.data;    
    });    
  }

  headers: string[] = ['Car', 'Type', 'Location', 'Insurance', 'Price', 'Action'];

  
  onDelete(data: any) {
    if (window.confirm('⚠️ Are you sure you want to delete this car?'))
    {
      this.carService.deleteCarById(data._id).subscribe({
        next: next => {
          alert('The item has been successfully deleted.');
          location.reload();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });      
    }
    else
    {
      return;
    }
  }
}
