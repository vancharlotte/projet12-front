import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "@auth0/auth0-angular";
import { Profil } from '../model/profil-model';

@Injectable({
    providedIn: 'root'
  })
  export class FavoriteService {
    constructor(public auth: AuthService, public http : HttpClient) { }

    serviceBaseUrl: string = 'http://localhost:9004/profil';

    addFavorite(locationId : String, profil : any){
        return this.http.put(encodeURI(`${this.serviceBaseUrl}/favorite/add/${locationId}`), profil);
      }

    deleteFavorite(locationId : String, profil : any){
        return this.http.put(encodeURI(`${this.serviceBaseUrl}/favorite/delete/${locationId}`), profil);
    }

    exist(locationId : String){
        return this.http.get(encodeURI(`${this.serviceBaseUrl}/favorite/exist/${locationId}`));
    }
    

  }