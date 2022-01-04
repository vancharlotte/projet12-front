import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { LocationComponent } from './component/location/location.component';
import { ProfilComponent } from './component/profil/profil.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'location', component: LocationComponent }

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