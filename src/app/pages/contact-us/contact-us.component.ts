import { Component, AfterViewInit, ViewChild, ElementRef } from 
  '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements AfterViewInit {

  constructor() { }
  
  @ViewChild('mapSearchField')
  searchField!: ElementRef;
  @ViewChild(GoogleMap)
  map!: GoogleMap;

  newLat!: number;
  newLng!: number;
  radius!: number;
  newLoc!: string[];
  isSearch: boolean = false;

  latitude = 43.78535919020365;
  longitude = -79.22819055960127;

  optionsofMap: google.maps.MapOptions = {
    center: {lat: this.latitude, lng: this.longitude},
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true,
    zoom: 12
  };

  userMarker = ({
    position: {
      lat: this.latitude,
      lng: this.longitude,
    },  
    options: { animation: google.maps.Animation.DROP,},
  }) 

  ngAfterViewInit():void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement,
    ); 
  }
}
