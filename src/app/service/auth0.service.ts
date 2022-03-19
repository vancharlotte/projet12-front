import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  constructor(public auth: AuthService, public http : HttpClient) { 

  }

  serviceBaseUrl: string = 'http://...';

  
}