import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-form-profil',
  templateUrl: './form-profil.component.html',
  styleUrls: ['./form-profil.component.scss']
})
export class FormProfilComponent implements OnInit {

  constructor(public auth: AuthService, public http : HttpClient) { }

  profilString!: any;
  profilAuth!: any;

  ngOnInit(): void {

 // implement a form to describe profil
   
  }


}
