import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() placeholder: String = 'Search';

  constructor(private router: Router) { }
  locations = ['Brampton'];
  date = new Date;
  isloc: boolean = true;
  isdf: boolean = true;
  isdt: boolean = true;
  location: string;

  goTo(df: string, dt: string) {
    const dateF = new Date(df);
    const dateT = new Date(dt);
    if(!this.location){
      alert('⚠️ You must complete all the fields');
      this.isloc = false;
      return;
    } else this.isloc = true;
    if(df.length < 1){
      alert('⚠️ You must complete all the fields');
      this.isdf = false;
      return;
    } else this.isdf = true;
    if(dt.length < 1){
      alert('⚠️ You must complete all the fields');
      this.isdt = false;
      return;
    } else this.isdt = true;
    if(dt < df) {
      alert('⚠️ Return date cannot be before Pick-up date!');
      this.isdt = false;
      return;
    } else {
      this.router.navigateByUrl('/car-list/'+ this.location+'/'+df+'/'+dt);
    }    
  }
  ngOnInit(): void {
    
  }

  changeLocation(event: any): void {
    this.location = event.target.value;
  }

}
