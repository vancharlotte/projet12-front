import { Component, Injectable } from '@angular/core';
import { concatMap, tap, pluck } from 'rxjs/operators';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
    providedIn: 'root'
  })
export class TestService {

  // Inject both AuthService and HttpClient
  constructor(public auth: AuthService, private http: HttpClient) {}

  test() {
    alert('call servicetest.test method');

    return this.http.get(
        encodeURI(`https://microservice-profil/profil/get/31482d4d-2124-414c-b186-8dbf1886af7f`)
      ) 
  }

}