import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ProfilComponent } from './component/profil/profil.component';
import { LocationComponent } from './component/location/location.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthButtonComponentComponent } from './component/auth-button-component/auth-button-component.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { FormLocationComponent } from './component/form-location/form-location.component';
import { MapBoxComponentComponent } from './map-box-component/map-box-component.component';

import { AuthModule } from '@auth0/auth0-angular';
// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    ProfilComponent,
    LocationComponent,
    AuthButtonComponentComponent,
    MapBoxComponentComponent,
    FormLocationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-kiddymap.eu.auth0.com',
      clientId: '4xx8AmoU9nEEbWWWOQJpli8IRxuzr0p4',
      audience: 'https://localhost:9004/',
      httpInterceptor: {
        allowedList: [
          'http://github.com/*',
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

   /* NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoidmFuY2hhcmxvdHRlIiwiYSI6ImNreDVteDZlajBwbjkycG81bXpvbTM0b3EifQ.2DT673epmd2M_5exl2sqYw', // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'pk.eyJ1IjoidmFuY2hhcmxvdHRlIiwiYSI6ImNreDVteDZlajBwbjkycG81bXpvbTM0b3EifQ.2DT673epmd2M_5exl2sqYw' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),*/
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
