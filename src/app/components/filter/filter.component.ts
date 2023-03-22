import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
  @Output() filterOptions = new EventEmitter<any[]>();

  types = [
    {
      id: 1,
      title: 'Sedan',
      checked: false,
    },
    {
      id: 2,
      title: 'SUV',
      checked: false,
    },
    {
      id: 3,
      title: 'Truck',
      checked: false,
    },
    {
      id: 4,
      title: 'Van',
      checked: false,
    },
  ]

  numberOfPassengers = [
    {
      id: 1,
      title: '2+',
      value:2,
      checked: false,
    },
    {
      id: 2,
      title: '4+',
      value:4,
      checked: false,
    },
    {
      id: 3,
      title: '5+',
      value:5,
      checked: false,
    },
    {
      id: 4,
      title: '6+',
      value:6,
      checked: false,
    },
    {
      id: 5,
      title: '7+',
      value:7,
      checked: false,
    },
    {
      id: 6,
      title: '8+',
      value:8,
      checked: false,
    },
  ]

  constructor() { }

  ngOnInit() {

  }

  onFilterChange(event: any) {
    const options = [this.types, this.numberOfPassengers];
    this.filterOptions.emit(options);
  }
}
