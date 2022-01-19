import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';


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
      center: [-103.5917, 40.6699],
      zoom: 3 // starting zoom
    });

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })
    );
    map.addControl(new mapboxgl.NavigationControl());


    map.on('load', () => {
      map.addSource('earthquakes', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        cluster: true,
        clusterMaxZoom: 8, //après ce zoom le cluster s'arrête
        clusterRadius: 100

      });

      /*map.addLayer({
      'id': 'earthquakes-layer',
      'type': 'circle',
      'source': 'earthquakes',
      'paint': {
      'circle-radius': 5,
      'circle-stroke-width': 2,
      'circle-color': 'red',
      'circle-stroke-color': 'white'
      }
      });
      });*/


      //define layer with cluster
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
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
        source: 'earthquakes',
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
        source: 'earthquakes',
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

        const source: mapboxgl.GeoJSONSource = map.getSource('earthquakes') as mapboxgl.GeoJSONSource;
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
          layers: ['unclustered-point'] // replace with your layer name
        });
        if (!features.length) {
          return;
        }
        const feature = features[0];

        const geometry = features[0].geometry;
        if (geometry.type === 'Point') {

          new mapboxgl.Popup()
            .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
            .setText(JSON.stringify(geometry.coordinates))

            /*.setHTML(
              `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
            )*/
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
