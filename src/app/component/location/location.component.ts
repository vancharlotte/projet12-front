import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom, map, mergeMap, Observable, switchMap } from 'rxjs';

import { Location } from 'src/app/model/location-model';
import { Profil } from 'src/app/model/profil-model';



@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  locationId!: any;
  exist: any;
  location: any;
  buttonValue!: string;
  button!: string;


  constructor(public auth: AuthService, public http: HttpClient) {
  }

  ngOnInit() {
    this.findLocation();


    this.existFavorite();

  }

  existFavorite() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.locationId = urlParams.get('id');

    this.findLocation();

    const sequence$ = this.auth.user$.pipe(
      switchMap(user =>
        this.http.get(
          encodeURI(`http://localhost:9004/profil/get/auth/` + user?.sub)).pipe(
            switchMap(profil =>
              this.http.get(
                encodeURI(`http://localhost:9004/profil/favorite/exist/` + JSON.parse(JSON.stringify(profil, null, 2)).id + "/" + this.locationId))))));

    sequence$.subscribe((result) => {
      this.exist = JSON.parse(JSON.stringify(result, null, 2)),
        console.log("exist" + this.exist);
      if (this.exist) {
        this.buttonValue = "Retirer des favoris";
      }
      else { this.buttonValue = "Ajouter aux favoris"; }
    });

  }

  findLocation(): Location {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const locationId = urlParams.get('id');

    this.http.get(
      encodeURI(`http://localhost:9004/location/get/` + locationId)).subscribe((locationJSON) => (this.location = JSON.parse(JSON.stringify(locationJSON, null, 2)),
        console.log(this.location.name)));

    return this.location;


  }


  modifyFavorite(button: string) {
    console.log("button : " + this.buttonValue);
    if (button == "Retirer des favoris") {
      this.removeFromFavorites();

    }
    else {
      this.addToFavorites();

    }


    console.log("buttonValue : " + this.buttonValue);

  }

  addToFavorites() {


    const sequence$ = this.auth.user$.pipe(
      switchMap(user =>
        this.http.get(
          encodeURI(`http://localhost:9004/profil/get/auth/` + user?.sub)).pipe(
            switchMap(profil =>
              this.http.put(
                encodeURI(`http://localhost:9004/profil/favorite/add/` + this.locationId), profil)))));

    sequence$.subscribe();

    this.buttonValue = "Retirer des favoris";


    console.log("add to favorites");

  }

  removeFromFavorites() {


    const sequence$ = this.auth.user$.pipe(
      switchMap(user =>
        this.http.get(
          encodeURI(`http://localhost:9004/profil/get/auth/` + user?.sub)).pipe(
            switchMap(profil =>
              this.http.put(
                encodeURI(`http://localhost:9004/profil/favorite/delete/` + this.locationId), profil)))));

    sequence$.subscribe();
    this.buttonValue = "Ajouter aux favoris";


    console.log("remove from favorites");
  }

}



