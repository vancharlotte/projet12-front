import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ProfilComponent } from './component/profil/profil.component';
import { LocationComponent } from './component/location/location.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './component/landing-page/landing-page.component';

import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponentComponent } from './component/auth-button-component/auth-button-component.component';
// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { MapBoxComponentComponent } from './map-box-component/map-box-component.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    ProfilComponent,
    LocationComponent,
    AuthButtonComponentComponent,
    MapBoxComponentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-kiddymap.eu.auth0.com',
      clientId: '4xx8AmoU9nEEbWWWOQJpli8IRxuzr0p4',
      audience: 'https://localhost:9004/',
       


  httpInterceptor: {
    allowedList: [
     'http://localhost:9004/*',
    { uri:'https://localhost:9004/*',
  
     tokenOptions: {
       // The attached token should target this audience
       audience: 'https://localhost:9004/',

       // The attached token should have these scopes
       scope : 'access:data, read:current_user'
    
     }
    }
  ]



  }
    }),
    HttpClientModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
