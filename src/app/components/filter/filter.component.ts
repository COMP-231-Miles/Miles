import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
  types = [
    {
      id: 1,
      title: 'cars',
      checked: false,
    },
    {
      id: 2,
      title: 'suvs',
      checked: false,
    },
    {
      id: 3,
      title: 'trucks',
      checked: false,
    },
    {
      id: 4,
      title: 'vans',
      checked: false,
    },
  ]

  numberOfPassengers = [
    {
      id: 1,
      title: '2+',
      checked: false,
    },
    {
      id: 2,
      title: '4+',
      checked: false,
    },
    {
      id: 3,
      title: '5+',
      checked: false,
    },
    {
      id: 4,
      title: '6+',
      checked: false,
    },
    {
      id: 5,
      title: '7+',
      checked: false,
    },
    {
      id: 6,
      title: '8+',
      checked: false,
    },
  ]

  constructor() { }

  ngOnInit() {

  }
}
