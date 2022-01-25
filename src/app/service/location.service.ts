import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(public auth: AuthService, public http : HttpClient) { }


notExist(lat:number, long:number) {
const serviceBaseUrl: string = 'http://localhost:9004/location';
return this.http.get(encodeURI(`${serviceBaseUrl}/exist/${lat}/${long}`));
}


}