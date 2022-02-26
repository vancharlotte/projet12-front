import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/model/profil-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }