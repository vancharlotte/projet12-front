import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoJSONSource } from 'mapbox-gl';
import { LocationService } from '../service/location.service';

import { HttpClient } from '@angular/common/http';

import {Router} from '@angular/router'; // import router from angular router
import { FormLocationComponent } from '../component/form-location/form-location.component';
import { LocationComponent } from '../component/location/location.component';




@Component({
  selector: 'app-mapbox',
  templateUrl: './map-box-component.component.html',
  styleUrls: ['./map-box-component.component.scss']

})
export class MapBoxComponentComponent implements OnInit {
  exist!: any;
  popup!: mapboxgl.Popup;


  constructor(private locationService : LocationService, public http : HttpClient, private route:Router) {

  }

  ngOnInit(): void {

    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidmFuY2hhcmxvdHRlIiwiYSI6ImNreDVteDZlajBwbjkycG81bXpvbTM0b3EifQ.2DT673epmd2M_5exl2sqYw';

    var map = new mapboxgl.Map({
      container: 'map-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [3.057256, 50.62925],
      zoom: 7,  // starting zoom
      hash: true

    });



    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken     })     );
    map.addControl(new mapboxgl.NavigationControl());

    map.doubleClickZoom.disable();
    map.scrollZoom.enable();

    map.on('load', () => {



      var bounds = map.getBounds();
      var url = 'http://localhost:9004/location/getAllGeoJson/'+ bounds.getSouth()+'/'+ bounds.getNorth()+'/'+ bounds.getWest()+'/'+bounds.getEast();
     // var url =  `http://localhost:9004/location/getAllGeoJson/${bounds.getSouth()}/${bounds.getNorth()}/${bounds.getWest()}/${bounds.getEast()}`;
      
      map.addSource('locations', {
        type: 'geojson',
      //  data: 'assets/data.geojson',
        data : url,
       cluster: true,
        clusterMaxZoom: 13, //après ce zoom le cluster s'arrête
        clusterRadius: 50

      });

      map.on('moveend', () => {
        var newBounds = map.getBounds();
       var newUrl = 'http://localhost:9004/location/getAllGeoJson/'+ newBounds.getSouth()+'/'+ newBounds.getNorth()+'/'+ newBounds.getWest()+'/'+ newBounds.getEast();
      // var newUrl =  `http://localhost:9004/location/getAllGeoJson/${bounds.getSouth()}/${bounds.getNorth()}/${bounds.getWest()}/${bounds.getEast()}`;
      
       (map.getSource('locations') as GeoJSONSource).setData(newUrl);        
      });

    
      
      //define layer with cluster
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'locations',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': 'blue',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,

          ]
        }
      });


      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'locations',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      //define layer with unclustered point
      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'locations',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': 'red',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });



      //pop on click on cluster
      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });


        const clusterId = features[0].properties!['cluster_id'];
        console.log(features[0].properties!['cluster_id']);

        const source: mapboxgl.GeoJSONSource = map.getSource('locations') as mapboxgl.GeoJSONSource;
        source.getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;
            const geometry = features[0].geometry;
            if (geometry.type === 'Point') {
              map.easeTo({
                center: [geometry.coordinates[0], geometry.coordinates[1]],
                zoom: zoom
              });
            }
          }
        );

      });


      //pop on click on unclustered point
      map.on('click', 'unclustered-point', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['unclustered-point' ]
        });
        if (!features.length) {
         alert('error length');
        }
        const feature = features[0];

        const geometry = features[0].geometry;
        const properties = features[0].properties;


        let div = document.createElement('div');
        div.innerHTML = ' <button routerLink="location" routerLinkActive="active">Consulter</button> ';

      

        console.log(properties);

         if( properties && geometry.type === 'Point'){
         this.popup = new mapboxgl.Popup(
          {
            closeButton: false,        }
         )
            .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
            .setDOMContent(div)
           //.setText(JSON.stringify(properties['name']))
            .addTo(map);

            div.addEventListener('click', () => {
              this.route.navigate(['/location'],{ queryParams: { id: properties['id']} }); // navigate to other page
            });
        }   
        
      });            


      
      map.on('dblclick', (e) => {
            var coordinates = e.lngLat;
            let div2 = document.createElement('div');
            div2.innerHTML = '<button id="mapboxgl-popup-btn" routerLink="addlocation" routerLinkActive="active">Ajouter</button>';
      
           // if(map.getZoom() >13 ) {
              let newLoc = new mapboxgl.Popup()
              .setDOMContent(      div2  )
              .setLngLat(coordinates)
              .addTo(map);

              div2.addEventListener('click', () => {
                this.route.navigate(['/addlocation'],{ queryParams: { lng: coordinates.lng, lat: coordinates.lat} }); // navigate to other page
              });

              let popupElem = newLoc.getElement();
              div2.style.color = "red";
              
          //  }
          });




      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
      });
      map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
      });


    });


  }

}
