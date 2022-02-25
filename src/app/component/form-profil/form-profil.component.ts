import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { NewProfil } from 'src/app/model/newProfil-model';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/service/profil.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Profil } from 'src/app/model/profil-model';

@Component({
  selector: 'app-form-profil',
  templateUrl: './form-profil.component.html',
  styleUrls: ['./form-profil.component.scss']
})
export class FormProfilComponent implements OnInit {
  profilForm: any;
  profil: any;
  userId: any;

  constructor(private fb: FormBuilder, private router: Router, private profilService: ProfilService, public auth: AuthService, public http: HttpClient) { }

  ngOnInit(): void {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.userId = urlParams.get('id');

    this.getUser(this.userId).then(
      () =>  this.profilForm = this.fb.group({
      authId: new FormControl(this.profil.authId),
      profilId: new FormControl(this.profil.id),
      username: new FormControl(this.profil.username, [Validators.required]),
      email: new FormControl(this.profil.email, [Validators.required]),
      description: new FormControl(this.profil.description, [Validators.required, Validators.minLength(5)]),
      favorites: new FormControl(this.profil.favorites),
    })
    );

  }


  updateProfil() {
    console.log(this.profilForm.value.authId)
    let updatedProfil: Profil = 
      new Profil(
        this.profilForm.value.profilId,
        this.profilForm.value.authId,
        this.profilForm.value.username,
        this.profilForm.value.email,
        this.profilForm.value.description,
        this.profilForm.value.favorites
      );
      console.log(this.profilForm.value.authId)

      console.log("profil" + updatedProfil.authId);


    this.http.put(
      encodeURI(`http://localhost:9004/profil/update/` + this.userId), updatedProfil).subscribe(
      );
    console.log("update");

    this.router.navigate(['/profil']);

  }


  get authId() {
    return this.profilForm.get('authId');
  }

  get profilId() {
    return this.profilForm.get('profilId');
  }

  get username() {
    return this.profilForm.get('username');
  }

  get email() {
    return this.profilForm.get('email');
  }

  get description() {
    return this.profilForm.get('description');
  }

  get favorites() {
    return this.profilForm.get('favorites');
  }



  getUser(id: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.get(
        encodeURI("http://localhost:9004/profil/get/id/" + id)).subscribe(
          result => {
            this.profil = result, 
            console.log("profil: " + this.profil.id);
            resolve();
          });

    })
  }

}

