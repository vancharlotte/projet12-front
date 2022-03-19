import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Profil } from '../model/profil-model';
import { NewProfil } from '../model/newProfil-model';


@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  
  constructor(public auth: AuthService, public http : HttpClient) { }

  serviceBaseUrl: string = 'http://localhost:9004/profil';


  createProfil(profil: NewProfil){
    return this.http.post(encodeURI(`${this.serviceBaseUrl}/add`), profil);
  }

  getProfilByAuthId(){
    return this.http.get(encodeURI(`${this.serviceBaseUrl}/get/auth`));
  }

  getProfilByProfilId(id : String){
    return this.http.get(encodeURI(`${this.serviceBaseUrl}/get/id/${id}`));
  }
  
  updateProfil(profil : Profil){      
    return this.http.put(encodeURI(`${this.serviceBaseUrl}/update/${profil.id}`),profil);

  }
  
  deleteProfil(profil : Profil){
    return this.http.delete(encodeURI(`${this.serviceBaseUrl}/delete/${profil.id}`));
  }
  
}