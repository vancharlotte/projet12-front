import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { NewProfil } from 'src/app/model/newProfil-model';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/service/profil.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Profil } from 'src/app/model/profil-model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-profil',
  templateUrl: './form-profil.component.html',
  styleUrls: ['./form-profil.component.scss']
})
export class FormProfilComponent implements OnInit {
  profilForm: any;
  profil: any;
  userId: any;
  profilSeq$: any;

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
      
      this.profilSeq$=  this.profilService.updateProfil(updatedProfil).subscribe();
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

  async getUser(id: string) {
    this.profil= await firstValueFrom(this.profilService.getProfilByProfilId(id))
      console.log("profil: " + this.profil.id);
    return this.profil;
  }

  ngOnDestroy() {
    this.profilSeq$.unsubscribe();
    console.log("unsuscribe");
    window.location.reload()

  }

}

