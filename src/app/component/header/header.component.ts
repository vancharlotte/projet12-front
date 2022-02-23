import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  this.http.post(
    encodeURI("http://localhost:9004/profil/auth/add/roles"), id).subscribe();
  }
}
