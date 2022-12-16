import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  pencil = faPencil;
  garbage = faTrashCan;

  isEdit: boolean = false;
  isAdd: boolean = false;

  carForm!: FormGroup;
  submitted = false;


  constructor(private reservationService: ReservationService, private formBuilder: FormBuilder) { 
    this.getReservations();    
  }

  getReservations() {
    this.reservationService.getReservations().subscribe(res => {
      this.carList = res.data;    
    });    
  }

  ngOnInit(): void {
  }

  /*onAddCar(data: any)
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
  }*/

  areCars: boolean = false;
  carList: any = []

  

  headers: string[] = ['User ID', 'Car ID', 'Location', 'Price', 'Action'];

  
  /*onDelete(data: any) {
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
  }*/

}
