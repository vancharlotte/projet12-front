import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import {Location } from '../model/location-model';



@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(public auth: AuthService, public http : HttpClient) { }

  serviceBaseUrl: string = 'http://localhost:9004/location';

  createLocation(location: Location){
    return this.http.post(encodeURI(`${this.serviceBaseUrl}/add`), location);
  }

  getProfil(location : Location){
    return this.http.get(encodeURI(`${this.serviceBaseUrl}/get/${location.id}`));
  }

  getAllLocations(){
    return this.http.get(encodeURI(`${this.serviceBaseUrl}/getAll`));
  }
  
  getLocationsGeoJsonInBetween(minLat:Number, maxLat:Number, minLong: Number, maxLong:Number){
    return this.http.get(encodeURI(`${this.serviceBaseUrl}/getAllGeoJson/${minLat}/${maxLat}/${minLong}/${maxLong}`));

  }


  updateProfil(location : Location){
    return this.http.put(encodeURI(`${this.serviceBaseUrl}/update/${location.id}`), location);

  }
  
  deleteProfil(location : Location){
    return this.http.delete(encodeURI(`${this.serviceBaseUrl}/delete/${location.id}`));
  }


notExist(lat:number, long:number) {

  return this.http.get(encodeURI(`${this.serviceBaseUrl}/exist/${lat}/${long}`));
}


}