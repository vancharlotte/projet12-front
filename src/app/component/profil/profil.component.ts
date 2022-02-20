import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Profil } from 'src/app/model/profil-model';
import { NewProfil } from 'src/app/model/newProfil-model';
import { lastValueFrom, map, mergeMap, Observable, switchMap, filter } from 'rxjs';

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
  user : any;
  profiltest: any;


  constructor(public auth: AuthService, public http : HttpClient, private route : Router) {}

  ngOnInit() {

    this.auth.user$.subscribe(
     (profilJSON) => (this.profilString = JSON.stringify(profilJSON, null, 2),
     this.profilAuth = JSON.parse(this.profilString),

    this.http.get(
      encodeURI(`http://localhost:9004/profil/get/auth/`+ this.profilAuth.sub)).subscribe(profilJSON2 => {
        //check if in bdd
        
        if(profilJSON2===null) {
        //if no, add to bbd(backend) and redirect to profil form
  
          this.http.post(
            encodeURI(`http://localhost:9004/profil/add`), new NewProfil(this.profilAuth.sub, this.profilAuth.email, "" , [] ))
            .subscribe(data =>  this.route.navigate(['/newProfil']));
        }
        else {
          //if yes, get info and display profil
          this.profil = JSON.parse(JSON.stringify(profilJSON2, null, 2)),
          console.log(this.profil.id)}

        }
      
      )));

      
    
    
  }


}

