import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ProfilComponent implements OnInit, OnDestroy {
  profil : any;
  user: any;


  constructor(public auth: AuthService, public http: HttpClient, private route: Router) { }

  ngOnInit() {

   this.getUser().then(() =>
      this.http.get(
        encodeURI(`http://localhost:9004/profil/get/auth/` + this.user.sub)).subscribe(profil => (
          this.profil = profil )))
  }



  getUser() {
    return new Promise<void>((resolve, reject) => {
      this.auth.user$.subscribe(
        result => {
          this.user = result;
          resolve();
        });

    })
  }

  modifyProfil(){
    this.route.navigate(['/editProfil'], { queryParams: { id: "acfdafb1-faed-4632-9f95-279160e1810e" } }); // navigate to other page


  }


  ngOnDestroy() {

  }


}

