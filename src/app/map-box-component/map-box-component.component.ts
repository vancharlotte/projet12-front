import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { isNull } from '@angular/compiler/src/output/output_ast';


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
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-103.5917, 40.6699],
      zoom: 3 // starting zoom
    });

   /* map.addSource('test', {
      type: 'geojson',
      data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
      });*/


      map.on('load', () => {
        map.addSource('earthquakes', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        
      });
         
        map.addLayer({
        'id': 'earthquakes-layer',
        'type': 'circle',
        'source': 'earthquakes',
        'paint': {
        'circle-radius': 8,
        'circle-stroke-width': 2,
        'circle-color': 'red',
        'circle-stroke-color': 'white'
        }
        });
        });

  /*  map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })
    );
    map.addControl(new mapboxgl.NavigationControl());

    // create the popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'TOUR EIFFEL.'
    );*/



  /*  const marker1 = new mapboxgl.Marker()
      .setLngLat([2.294481
        , 48.858370])
      .setPopup(popup)
      .addTo(map);*/

 /*   map.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      })

    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
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

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });

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
    });*/


   /* map.on('click', 'unclustered-point', (e) => {

     /* const geometry = features[0].geometry;
      const coordinates = e.features[0]!.geometry.coordinates.slice();
      const mag = e.features[0].properties!['mag'];
      const tsunami =
      e.features[0].properties!['tsunami'] === 1 ? 'yes' : 'no';
       
      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
       
      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(
      `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
      )
      .addTo(map);
      });*/

/*
      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
        });

        */



  }





}
