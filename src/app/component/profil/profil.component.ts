import { HttpClient } from '@angular/common/http';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  profileJson!: any;
  message! : string;

  constructor(public auth: AuthService, public http : HttpClient) {}

  ngOnInit() {
    this.auth.user$.subscribe(
     (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }

  callApi() {
    this.http.get(
      encodeURI(`http://localhost:9002/profil/get/31482d4d-2124-414c-b186-8dbf1886af7f`)).subscribe((message) => (this.message = JSON.stringify(message, null, 2))
      );
      alert(this.message);
  }
}
