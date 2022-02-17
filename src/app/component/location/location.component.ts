import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { Location } from 'src/app/model/location-model';



@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  location! : Location;
  locationId!: string;
  profilId!: string; 
  profilString!: string;
  profilAuth!: any;
  profil!: any;

  constructor(public auth: AuthService, public http : HttpClient) {   
  }

  ngOnInit(): void {

    const queryString = window. location. search;
    const urlParams = new URLSearchParams(queryString);
    const locationId = urlParams.get('id');

      this.http.get(
        encodeURI(`http://localhost:9004/location/get/`+ locationId)).subscribe((locationJSON) => ( this.location = JSON.parse(JSON.stringify(locationJSON, null, 2)),
           console.log(this.location.id)));
 


    this.auth.user$.subscribe(
      (profilJSON) => (this.profilString = JSON.stringify(profilJSON, null, 2),
      this.profilAuth = JSON.parse(this.profilString),
  //   console.log("JSON object -", this.profilAuth.sub),

     
     this.http.get(
       encodeURI(`http://localhost:9004/profil/get/auth/`+ this.profilAuth.sub)).subscribe((profilJSON2) => ( this.profil = JSON.parse(JSON.stringify(profilJSON2, null, 2)),
          console.log("find profil id"),
          this.http.get(
            encodeURI(`http://localhost:9004/profil/favorite/exist/`+ this.profil.id + "/" + this.location.id)).subscribe((locationJSON) => ( this.location = JSON.parse(JSON.stringify(locationJSON, null, 2)),
               console.log("look for favorite"))))
     
          
          
          
          )));


     ;

    
  
}
  
  addToFavorites(){
    console.log("add to favorites");
  }

  removeFromFavorites(){
    console.log("remove from favorites");
  }
  
}