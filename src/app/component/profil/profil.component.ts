import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Profil } from 'src/app/model/profil-model';
import { NewProfil } from 'src/app/model/newProfil-model';
import { lastValueFrom, map, mergeMap, Observable, switchMap, filter, firstValueFrom } from 'rxjs';
import { ProfilService } from 'src/app/service/profil.service';



@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  profil : any;
  user: any;
  profilSeq! : any;


  constructor(public profilService: ProfilService, public auth: AuthService, public http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.profilSeq =
    this.profilService.getProfilByAuthId().subscribe(
          profil => (
          this.profil =  profil ,
          console.log(this.profil)
          )
          )
  }


  modifyProfil(){ 
    console.log("id : "+ this.profil.id)
    this.route.navigate(['/editProfil'], { queryParams: { id : this.profil.id} }) 
    // navigate to other page
  }


  ngOnDestroy() {
    console.log("unsuscribe")
    this.profilSeq.unsubscribe();
  }


}

