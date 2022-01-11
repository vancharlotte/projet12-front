import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-box-component',
  templateUrl: './map-box-component.component.html',
  styleUrls: ['./map-box-component.component.scss']
})
export class MapBoxComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidmFuY2hhcmxvdHRlIiwiYSI6ImNreDVteDZlajBwbjkycG81bXpvbTM0b3EifQ.2DT673epmd2M_5exl2sqYw';

    var map = new mapboxgl.Map({
    container: 'map-mapbox',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [2.2923472384059096, 48.86277359529868], // starting position [lng, lat]
    zoom: 12 // starting zoom
    });
  }

  


}
