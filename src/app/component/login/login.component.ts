import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { NewProfil } from 'src/app/model/newProfil-model';
import { Router } from '@angular/router';
import { ProfilService } from '../../service/profil.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public profilService : ProfilService, public auth: AuthService, public http: HttpClient, private route: Router) { }

  user! : any;

  ngOnInit() {
    this.getUser().then(() => this.profilService.createProfil( new NewProfil(this.user.sub, this.user.email,  this.user.email,"" , [] )).subscribe() );

    this.route.navigate([""]);
   
  }

 async getUser(){    
      this.user = await firstValueFrom( this.auth.user$)
      return this.user
  }

  ngOnDestroy() {
  }
  


}