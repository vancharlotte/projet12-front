import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/location-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.scss']
})
export class FormLocationComponent implements OnInit {

  location!: Location;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(locationForm:NgForm) { 
    alert('qsdfghjkl');
   }

}
