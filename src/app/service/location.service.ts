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
    console.log("add location");
    return this.http.post(encodeURI(`${this.serviceBaseUrl}/protected/add`), location);
  }

  getLocation(locationId : any){
    return this.http.get(encodeURI(`${this.serviceBaseUrl}/public/get/${locationId}`));
  }
  
  getLocationsGeoJsonInBetween(minLat:Number, maxLat:Number, minLong: Number, maxLong:Number){
    return this.http.get(encodeURI(`${this.serviceBaseUrl}/public/getAllGeoJson/${minLat}/${maxLat}/${minLong}/${maxLong}`));
  }

  updateProfil(location : Location){
    return this.http.put(encodeURI(`${this.serviceBaseUrl}/protected/update/${location.id}`), location);
  }
  
  deleteProfil(location : Location){
    return this.http.delete(encodeURI(`${this.serviceBaseUrl}/protected/delete/${location.id}`));
  }


notExist(lat:number, long:number) {
  return this.http.get(encodeURI(`${this.serviceBaseUrl}/protected/exist/${lat}/${long}`));
}


}