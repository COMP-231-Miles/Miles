import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrls: ['./card-car.component.scss']
})
export class CardCarComponent implements OnInit {
  @Input() data!: any;
  @Input() dateFrom! : any;
  @Input() dateTo! : any;

  @Input() isInventory: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
