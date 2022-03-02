import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';




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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormProfilComponent } from './component/form-profil/form-profil.component';
import { LoginComponent } from './login/login.component';
import { EditLocationComponent } from './edit-location/edit-location.component';



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
    FormProfilComponent,
    LoginComponent,
    EditLocationComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    
    AuthModule.forRoot({
      domain: 'dev-kiddymap.eu.auth0.com',
      clientId: '4xx8AmoU9nEEbWWWOQJpli8IRxuzr0p4',
      audience: 'https://localhost:9004/',
      httpInterceptor: {
        allowedList: [
          'https://dev-kiddymap.eu.auth0.com/*',
          'http://github.com/*',
          'http://localhost:9004/profil/*',
          'http://localhost:9004/location/protected/*',
          'http://localhost:9004/equipment/*',

          {
            uri : 'http://localhost:9004/location/public/*',
            allowAnonymous : true
          }
          


        ]
       
      }
    }),
    HttpClientModule,
    BrowserAnimationsModule,

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
