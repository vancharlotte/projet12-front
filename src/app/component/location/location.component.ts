import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  location! : any;

  constructor(public auth: AuthService, public http : HttpClient) {}

  ngOnInit(): void {
  }

  
  callApi() {
    this.http.get(
      encodeURI(`http://localhost:9004/location/getAllGeoJson`)).subscribe((location) => (this.location = JSON.stringify(location, null, 2))
      );
  }
}