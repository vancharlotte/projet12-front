import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { FormLocationComponent } from './component/form-location/form-location.component';
import { FormProfilComponent } from './component/form-profil/form-profil.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { LocationComponent } from './component/location/location.component';
import { ProfilComponent } from './component/profil/profil.component';
import { LoginComponent } from './login/login.component';
import { MapBoxComponentComponent } from './map-box-component/map-box-component.component';

const routes: Routes = [
    { path: '', component: MapBoxComponentComponent },
    { path: 'profil', component: ProfilComponent, },
    { path: 'location', component: LocationComponent },
    { path: 'addlocation', component: FormLocationComponent },
    { path: 'editLocation', component: EditLocationComponent },
    { path: 'editProfil', component: FormProfilComponent },
    { path: 'login', component: LoginComponent }


];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class AppRoutingModule {}