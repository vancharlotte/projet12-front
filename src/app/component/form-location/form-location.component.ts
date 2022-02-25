import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/location-model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.scss']
})
export class FormLocationComponent implements OnInit {
  locationForm!: any;
  equipmentArray!: any;
  location!: any;
  equipmentsList!: any;

//ajouter à l'environnemeent?
  Data: Array<any> = [
    { name: 'chaise haute', value: '3138aa5d-23ec-4836-b387-0ddf5eaa23f9' },
    { name: 'table à langer', value: '75892ad1-24ce-4ea6-b05e-ac33a5423954' },
    { name: 'micro-onde', value: '545fa4c6-2be2-4862-87a4-d4d82c0e8be0' },
    { name: 'parking poussette', value: '3bb45472-a960-4a9c-b252-b57046581384' },
    { name: 'aire de jeu', value: '4236e64a-1718-4809-b0b1-d13f72f599a4' },
    { name: 'espace allaitement', value: '3181e984-cdd8-48d9-a7cc-b5d33f669448' }
  ];



  constructor(private fb: FormBuilder, private router: Router, private locationService: LocationService, public auth: AuthService, public http: HttpClient) { }

  ngOnInit(): void {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lng = urlParams.get('lng');
    const lat = urlParams.get('lat');

    this.locationForm = this.fb.group({
      longitude: new FormControl(lng),
      latitude: new FormControl(lat),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      equipments: this.fb.array([]),
    });



  }

  addLocation() {
    console.log("location" + this.locationForm.value.name)
    this.http.get(encodeURI('http://localhost:9004/location/equipment/list/' + this.locationForm.value.equipments))
      .toPromise().then(result => {
        this.equipmentsList = result, console.log(result)

        let location: Location = 
      new Location(
        '',
        this.locationForm.value.longitude,
        this.locationForm.value.latitude,
        this.locationForm.value.name,
        this.locationForm.value.description,
        this.equipmentsList
              );
        console.log(location);
        this.http.post(
          encodeURI(`http://localhost:9004/location/add`), location).subscribe(data => {
            this.location = data;
          });
      })

    this.router.navigate(['']);

  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.locationForm.get('equipments') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
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
