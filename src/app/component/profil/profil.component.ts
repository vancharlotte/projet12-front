import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Profil } from 'src/app/model/profil-model';
//import { ProfilService } from 'src/app/service/profil.service';



@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  profilString! : string;
  profilAuth! : any;
  profil! : Profil;

  constructor(public auth: AuthService, public http : HttpClient) {}

  ngOnInit() {
    this.auth.user$.subscribe(
     (profilJSON) => (this.profilString = JSON.stringify(profilJSON, null, 2),
     this.profilAuth = JSON.parse(this.profilString),
 //   console.log("JSON object -", this.profilAuth.sub),
    
    this.http.get(
      encodeURI(`http://localhost:9004/profil/get/auth/`+ this.profilAuth.sub)).subscribe((profilJSON2) => ( this.profil = JSON.parse(JSON.stringify(profilJSON2, null, 2)),
         console.log(this.profil.id))) 

     )
    );


  }


}

