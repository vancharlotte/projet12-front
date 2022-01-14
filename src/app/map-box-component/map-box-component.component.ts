import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

//import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


@Component({
  selector: 'app-mapbox',
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

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken      })
    );
    map.addControl(new mapboxgl.NavigationControl());

    // create the popup
const popup = new mapboxgl.Popup({ offset: 25 }).setText(
  'TOUR EIFFEL.'
  );
    


    const marker1 = new mapboxgl.Marker()
    .setLngLat([2.294481
      , 48.858370])
    .setPopup(popup)
    .addTo(map);
    

  }

  


}
