import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { NewProfil } from 'src/app/model/newProfil-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="auth.logout({ returnTo: document.location.origin })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="login()">Log in</button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponentComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public http: HttpClient) {}

  user: any;

  ngOnInit(): void {
  }

  login(){
    this.auth.loginWithRedirect(
      { appState: { target: '/login' }    })    
   
  }


}
