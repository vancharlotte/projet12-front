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
  location! : Location;
  locationId!: any;
  profil!: any; 
  profilString!: string;
  profilAuth!: any;
  data!: any;
  exist!: boolean;
sub!:any;


  constructor(public auth: AuthService, public http : HttpClient) {   
  }

   ngOnInit() {

    const queryString = window. location. search;
    const urlParams = new URLSearchParams(queryString);
    this.locationId = urlParams.get('id');
    
    this.findLocation();
    
    const sequence$ = this.auth.user$.pipe(
    switchMap(user => 
       this.http.get(
        encodeURI(`http://localhost:9004/profil/get/auth/`+ user?.sub)).pipe(
          switchMap(data => 
            this.http.get(
              encodeURI(`http://localhost:9004/profil/favorite/exist/`+ JSON.parse(JSON.stringify(data, null, 2)).id + "/" + this.locationId))))));

    sequence$.subscribe((boo) => ( this.exist = JSON.parse(JSON.stringify(boo, null, 2)), console.log(this.exist)));
  
  
  
}


getProfilId(): Observable<any> {
      return this.finduseridtest(this.sub).pipe(map(sub  => this.findusersubtest()));
}



findLocationtest(){
  const queryString = window. location. search;
    const urlParams = new URLSearchParams(queryString);
    this.locationId = urlParams.get('id');

  return this.http.get(
    encodeURI(`http://localhost:9004/location/get/`+ this.locationId));
}

findusersubtest() : any{
   this.auth.user$;

  
} 

finduseridtest(subid:any){
  return this.http.get(
    encodeURI(`http://localhost:9004/profil/get/auth/`+ subid))
}

findLocation():Location{
  const queryString = window. location. search;
    const urlParams = new URLSearchParams(queryString);
    const locationId = urlParams.get('id');

    this.http.get(
        encodeURI(`http://localhost:9004/location/get/`+ locationId)).subscribe((locationJSON) => ( this.location = JSON.parse(JSON.stringify(locationJSON, null, 2)),
           console.log(this.location.name)));

           return this.location;
  

}

getSubUser() : any{
  this.auth.user$.subscribe((data:any) => {
    if(data != null) {  
      console.log(data.sub); 
      return data.sub;
    }
    else {
      console.log(data.sub);
      return "prout";

}
  })
}

isFavorite(userid:string, locid:string) : boolean {


  
    this.http.get(
          encodeURI(`http://localhost:9004/profil/favorite/exist/`+ userid + "/" +locid)).subscribe((locationJSON) => ( this.exist = JSON.parse(JSON.stringify(locationJSON, null, 2)),
             console.log("look for favorite")));

          return this.exist;
}
  
  addToFavorites(){
    console.log("add to favorites");
  }

  removeFromFavorites(){
    console.log("remove from favorites");
  }
  
}

function profilJSON(profilJSON: any) {
  throw new Error('Function not implemented.');
}
