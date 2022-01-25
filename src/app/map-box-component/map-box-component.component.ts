import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoJSONSource } from 'mapbox-gl';


@Component({
  selector: 'app-mapbox',
  templateUrl: './map-box-component.component.html',
  styleUrls: ['./map-box-component.component.scss']

})
export class MapBoxComponentComponent implements OnInit {

  constructor() {

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

    const bounds = map.getBounds();

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken     })     );
    map.addControl(new mapboxgl.NavigationControl());

    var url = 'http://localhost:9004/location/getAllGeoJson/'+ bounds.getSouth()+'/'+ bounds.getNorth()+'/'+ bounds.getWest()+'/'+bounds.getEast();


    map.on('load', () => {
      
      map.addSource('locations', {
        type: 'geojson',
      //  data: 'assets/data.geojson',
        data : url,
       cluster: true,
        clusterMaxZoom: 13, //après ce zoom le cluster s'arrête
        clusterRadius: 50

      });

      map.on('move', () => {
        (map.getSource('locations') as GeoJSONSource).setData(url);        });
      
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
