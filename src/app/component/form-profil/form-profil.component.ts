import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { NewProfil } from 'src/app/model/newProfil-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-profil',
  templateUrl: './form-profil.component.html',
  styleUrls: ['./form-profil.component.scss']
})
export class FormProfilComponent implements OnInit {

  constructor(public auth: AuthService, public http : HttpClient, private route : Router) { }

  user! : any;

  ngOnInit() {
 // implement a form to describe profil
   
  }

}
