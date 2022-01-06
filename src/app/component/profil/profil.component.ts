import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { Profil } from 'src/app/model/profil-model';



@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  profileJson!: any;
  profil! : any;

  constructor(public auth: AuthService, public http : HttpClient) {}

  ngOnInit() {
    this.auth.user$.subscribe(
     (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }

  callApi() {
    this.http.get(
      encodeURI(`http://localhost:9004/profil/get/31482d4d-2124-414c-b186-8dbf1886af7f`)).subscribe((profil) => (this.profil = JSON.stringify(profil, null, 2))
      );
  }
}
