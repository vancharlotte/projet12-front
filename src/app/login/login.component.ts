import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { NewProfil } from 'src/app/model/newProfil-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, public http: HttpClient, private route: Router) { }

  user! : any;

  ngOnInit() {

    this.getUser().then(() => 
      this.http.post(
        encodeURI(`http://localhost:9004/profil/add`), new NewProfil(this.user.sub, this.user.email, "" , [] )).subscribe(),    
    );

    this.route.navigateByUrl("");


 // implement a form to describe profil
   
  }

  getUser(){    
    return new Promise<void>((resolve , reject) => {
      this.auth.user$.subscribe(
        result => {
          this.user = result;
          resolve();
      });
      
    })
  }

}