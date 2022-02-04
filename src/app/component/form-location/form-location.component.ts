import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/location-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.scss']
})
export class FormLocationComponent  {

locationForm = new  FormGroup({
  name:  new FormControl('', [Validators.required]),
   description: new FormControl('', [Validators.required, Validators.minLength(5)]),
   
  });



addLocation(){
  console.warn(this.locationForm.value)

  const queryString = document.location.hash;
  console.log(queryString);
  // get logitude and latitude from hash et ajouter à l'obj Location quand on crée 


    let location: Location = Object.assign(new Location( ), this.locationForm.value);
    console.log(location.name);


}

get name(){
  return this.locationForm.get('name');
}

get description(){
  return this.locationForm.get('description');
}


}
