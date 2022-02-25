import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/model/profil-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }


  test(){
    let id   = "auth0|6216659b451fab0068757791"
    var profil = new Profil(
      "acfdafb1-faed-4632-9f95-279160e1810e",
      "auth0|62166f5d1f4665006957e5ec",
      "truc",
      "asticot@gmail.com",
      "description du profil",
      []
    )
  this.http.patch(
    encodeURI("http://localhost:9004/profil/auth/update/email"), profil).subscribe();
  }
}
