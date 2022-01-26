import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoJSONSource } from 'mapbox-gl';
import { LocationService } from '../service/location.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-mapbox',
  templateUrl: './map-box-component.component.html',
  styleUrls: ['./map-box-component.component.scss']

})
export class MapBoxComponentComponent implements OnInit {
  exist!: any;
  popup!: mapboxgl.Popup;

  constructor(private locationService : LocationService, public http : HttpClient) {

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


    map.on('load', () => {
      var bounds = map.getBounds();
      var url = 'http://localhost:9004/location/getAllGeoJson/'+ bounds.getSouth()+'/'+ bounds.getNorth()+'/'+ bounds.getWest()+'/'+bounds.getEast();

      
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
      map.on('mouseenter', 'unclustered-point', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['unclustered-point' ]
        });
        if (!features.length) {
         alert('prout');
        }
        const feature = features[0];

        const geometry = features[0].geometry;
        if (geometry.type === 'Point') {

         this.popup = new mapboxgl.Popup(
          {
            closeButton: false,        }
         )
            .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
            .setText(JSON.stringify(geometry.coordinates))
            .addTo(map);
        }   
        
        
      
      });

      map.on('mouseleave', 'unclustered-point', (e) => {
        this.popup.remove();
      });

      map.on('click', (e) => {
            var coordinates = e.lngLat;
            if(map.getZoom() >13 ) {
            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML('you clicked here: <br/>' + coordinates) //add button to create new marker
              .addTo(map);
            }
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
