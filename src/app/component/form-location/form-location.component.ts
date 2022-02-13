import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/location-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.scss']
})
export class FormLocationComponent implements OnInit  {
  locationForm!:any;  

  ngOnInit(): void {
  
  const queryString = window. location. search;
  const urlParams = new URLSearchParams(queryString);
  const lng = urlParams.get('lng');
  const lat = urlParams.get('lat');

  this.locationForm = new  FormGroup({
  longitude:new FormControl(lng),
  latitude: new FormControl(lat),
  name:  new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required, Validators.minLength(5)]),
   
  });

}

addLocation(){
let location: Location = Object.assign(new Location( ), this.locationForm.value);
console.log(location.name);

//add location to bdd via service location
//redirect vers map with new marker on marker location (add pop up confirmation?)


}

get name(){
  return this.locationForm.get('name');
}

get description(){
  return this.locationForm.get('description');
}


}
