import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/location-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.scss']
})
export class FormLocationComponent implements OnInit  {
  locationForm!:any;  
  location!: any;
  
  constructor( private router: Router, private locationService : LocationService, public auth: AuthService, public http : HttpClient) {}

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

this.http.post(
  encodeURI(`http://localhost:9004/location/add`),location).subscribe(data => {
    this.location = data;
});

this.router.navigate(['']);

}

get name(){
  return this.locationForm.get('name');
}

get description(){
  return this.locationForm.get('description');
}



}
