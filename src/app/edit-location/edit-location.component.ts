import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/location-model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { newArray } from '@angular/compiler/src/util';



@Component({
  selector: 'edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
  locationId : any;
  locationForm!: any;
 // equipmentArray!: [any];
  location!: any;
  equipmentsList!: any;

//ajouter à l'environnemeent?
  Data: Array<any> = [
    { name: 'chaise haute', value: '3138aa5d-23ec-4836-b387-0ddf5eaa23f9', checked:false },
    { name: 'table à langer', value: '75892ad1-24ce-4ea6-b05e-ac33a5423954', checked:false },
    { name: 'micro-onde', value: '545fa4c6-2be2-4862-87a4-d4d82c0e8be0', checked:false },
    { name: 'parking poussette', value: '3bb45472-a960-4a9c-b252-b57046581384', checked:false },
    { name: 'aire de jeu', value: '4236e64a-1718-4809-b0b1-d13f72f599a4', checked:false },
    { name: 'espace allaitement', value: '3181e984-cdd8-48d9-a7cc-b5d33f669448', checked:false }
  ];



  constructor(private fb: FormBuilder, private router: Router, private locationService: LocationService, public auth: AuthService, public http: HttpClient) { }

   ngOnInit() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.locationId = urlParams.get('id');

    this.getLocation(this.locationId).then(
      ()=> this.fillForm(this.location)
    )

  
  }

  
  getLocation(id: string) {
    return new Promise<void>( (resolve, reject) => {
       this.http.get(
        encodeURI("http://localhost:9004/location/get/" + id)).subscribe(
          result => {
            this.location = result, 
            console.log(this.location);
            resolve();
          });

    })  }


  fillForm(location : any){

 var equipmentArray = new Array();

   for (let i = 0; i < this.Data.length; i++) {
    for (let j = 0; j < this.location.equipments.length; j++) {
  
     if ( this.Data[i].value==this.location.equipments[j].id)
     {this.Data[i].checked = true,
      equipmentArray.push(this.location.equipments[j].id)
    }
  }}


    this.locationForm = this.fb.group({
        id: new FormControl(location.id),
        longitude: new FormControl(location.longitude, [Validators.required]),
        latitude:  new FormControl(location.latitude, [Validators.required]),
        name: new FormControl(location.name, [Validators.required]),
        description: new FormControl(location.description, [Validators.required, Validators.minLength(5)]),
        equipments: this.fb.array(equipmentArray)
      });

      console.log("value : " + this.locationForm.value.equipments.length)
    }

  updateLocation() {
    console.log("location " + this.locationForm.value.name)
    this.http.get(encodeURI('http://localhost:9004/location/equipment/list/' + this.locationForm.value.equipments))
      .toPromise().then(result => {
        this.equipmentsList = result, console.log(result)
   
        let updatedLocation: Location = 
      new Location(
        this.locationId,
        this.locationForm.value.longitude,
        this.locationForm.value.latitude,
        this.locationForm.value.name,
        this.locationForm.value.description,
        this.equipmentsList
              );

        this.http.put(
          encodeURI(`http://localhost:9004/location/update/`+ this.locationId), updatedLocation).subscribe(data => {
            this.location = data;
          });
      })

    this.router.navigate(['']);

  }


  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.locationForm.get('equipments') as FormArray;
    console.log("value : " + checkArray.length)

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log("value : " + checkArray.length)

    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          console.log("value : " + checkArray.length)
          return;
        }
        i++;
      });
    }
  }

  get longitude() {
    return this.locationForm.get('longitude');
  }

  get latitude() {
    return this.locationForm.get('latitude');
  }

  get name() {
    return this.locationForm.get('name');
  }

  get description() {
    return this.locationForm.get('description');
  }

  get equipments(): FormArray {
    return this.locationForm.get("equipments") as FormArray
  }


}
