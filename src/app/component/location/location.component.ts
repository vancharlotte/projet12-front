import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom, map, mergeMap, Observable, Subscription, switchMap } from 'rxjs';

import { Location } from 'src/app/model/location-model';
import { FavoriteService } from 'src/app/service/favorite.service';
import { LocationService } from 'src/app/service/location.service';
import { ProfilService } from 'src/app/service/profil.service';



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
  seq: any;
  sequenceExist$: any;
  sequenceFind$: any;
  authenticated!: boolean;
  admin: any;


  private readonly subscriptions = new Subscription();

  constructor(public locationService: LocationService, public profilService: ProfilService, public favoriteService: FavoriteService, public auth: AuthService, public http: HttpClient, public route: Router) {
  }

  ngOnInit() {


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.locationId = urlParams.get('id')

    this.admin=false;
    this.getUserRole();

    this.findLocation(this.locationId);


    this.existFavorite(this.locationId);

  }

  existFavorite(locationId: any) {

    const sub = this.favoriteService.exist(locationId).subscribe((result) => {
      this.exist = result,
        console.log("exist" + this.exist);
      if (this.exist) {
        this.buttonValue = "Retirer des favoris";
      }
      else { this.buttonValue = "Ajouter aux favoris"; }
    });

    this.subscriptions.add(sub);

  }

  findLocation(locationId: any): Location {

    const sub = this.sequenceFind$ = this.locationService.getLocation(locationId).subscribe((result) => (this.location = result,
      console.log(this.location.name)));

    this.subscriptions.add(sub);

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
    const sequence$ =
      this.profilService.getProfilByAuthId().pipe(
        switchMap(profil =>
          this.favoriteService.addFavorite(this.locationId, profil)));

    const sub = sequence$.subscribe();
    this.subscriptions.add(sub);


    //if pas d'erreur

    this.buttonValue = "Retirer des favoris";

    console.log("add to favorites");


  }

  removeFromFavorites() {
    const sequence$ =
      this.profilService.getProfilByAuthId().pipe(
        switchMap(profil =>
          this.favoriteService.deleteFavorite(this.locationId, profil)));

    const sub = sequence$.subscribe();
    this.subscriptions.add(sub);


    //if pas d'erreur

    this.buttonValue = "Ajouter aux favoris";
    console.log("remove from favorites");

  }

  getUserRole() {
    const sub = this.auth.idTokenClaims$.subscribe(result => {
      var role = result?.['https://localhost:9002/roles'];
      if (role = "admin") { this.admin = true }
    })

    this.subscriptions.add(sub);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}



