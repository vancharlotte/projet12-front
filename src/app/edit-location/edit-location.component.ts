import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/location-model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';


@Component({
  selector: 'edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
  locationId: any;
  locationForm!: any;
  location!: any;

  private readonly subscriptions = new Subscription();


  //ajouter à l'environnemeent?
  Data: Array<any> = [
    { name: 'chaise haute', value: '3138aa5d-23ec-4836-b387-0ddf5eaa23f9', checked: false },
    { name: 'table à langer', value: '75892ad1-24ce-4ea6-b05e-ac33a5423954', checked: false },
    { name: 'micro-onde', value: '545fa4c6-2be2-4862-87a4-d4d82c0e8be0', checked: false },
    { name: 'parking poussette', value: '3bb45472-a960-4a9c-b252-b57046581384', checked: false },
    { name: 'aire de jeu', value: '4236e64a-1718-4809-b0b1-d13f72f599a4', checked: false },
    { name: 'espace allaitement', value: '3181e984-cdd8-48d9-a7cc-b5d33f669448', checked: false }
  ];

  constructor(private fb: FormBuilder, private router: Router, private locationService: LocationService, public auth: AuthService, public http: HttpClient) { }

  ngOnInit() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.locationId = urlParams.get('id');

    this.getLocation(this.locationId).then(
      () => this.fillForm(this.location)
    );


  }

  async getLocation(id: string) {
    this.location = await firstValueFrom(this.locationService.getLocation(id))
    console.log(this.location);
    return this.location;
  }



  fillForm(location: any) {
    var equipmentArray = new Array();
    for (let i = 0; i < this.Data.length; i++) {
      for (let j = 0; j < this.location.equipments.length; j++) {
        if (this.Data[i].value == this.location.equipments[j].id) {
          this.Data[i].checked = true,
            equipmentArray.push(this.location.equipments[j].id)
        }
      }
    }

    this.locationForm = this.fb.group({
      id: new FormControl(location.id),
      longitude: new FormControl(location.longitude, [Validators.required]),
      latitude: new FormControl(location.latitude, [Validators.required]),
      name: new FormControl(location.name, [Validators.required]),
      description: new FormControl(location.description, [Validators.required, Validators.minLength(5)]),
      equipments: this.fb.array(equipmentArray)
    });

  }

  updateLocation() {
    let updatedLocation: Location =
      new Location(
        this.locationId,
        this.locationForm.value.longitude,
        this.locationForm.value.latitude,
        this.locationForm.value.name,
        this.locationForm.value.description,
        this.locationForm.value.equipments
      );

      const sub = this.locationService.updateProfil(updatedLocation).subscribe(data => {
        this.location = data;
      });
  
      console.log("update location ")

    this.subscriptions.add(sub);

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

ngOnDestroy() {
  this.subscriptions.unsubscribe();
}



}
