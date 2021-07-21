import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Icon, Style, Fill, Text } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';

// constants for markers on the map

const deLuxe = new Feature({
  geometry: new Point(fromLonLat([30.511312, 50.431712])),
  name: 'deLuxe',
});

const Luxoft = new Feature({
  geometry: new Point(fromLonLat([30.410408, 50.45031])),
  name: 'Luxoft',
});

const trainStation = new Feature({
  geometry: new Point(fromLonLat([30.740454, 46.466034])),
  name: 'TrainStation',
});

// styling fro the markers

const faMarkerSolidStyle = new Style({
  text: new Text({
    text: '\uf041', // fas marker solid
    scale: 1,
    font: 'normal 18px FontAwesome',
    offsety: -30,
    offsetx: -10,
    fill: new Fill({ color: 'red' }),
  }),
});

const faCircleSolidStyle = new Style({
  text: new Text({
    text: '\uf111', // fas circle
    scale: 2,
    font: 'normal 18px FontAwesome',
    offsety: -30,
    offsetx: -10,
    fill: new Fill({ color: 'transparent' }),
  }),
});

deLuxe.setStyle([faCircleSolidStyle, faMarkerSolidStyle]);
Luxoft.setStyle([faCircleSolidStyle, faMarkerSolidStyle]);
trainStation.setStyle([faCircleSolidStyle, faMarkerSolidStyle]);

// layer for correct rendering markers on the map view

const vectorSource = new VectorSource({
  features: [deLuxe, Luxoft, trainStation],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

// data for cities in the map
const kyiv = fromLonLat([30.52916, 50.443513]);
const odesa = fromLonLat([30.720736, 46.475227]);
const lviv = fromLonLat([24.032147, 49.837982]);

// animation for the changing  cities

function onClick(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
}

onClick('reset', function () {
  view.animate({
    center: kyiv,
    duration: 2000,
    zoom: 6,
  });
});

onClick('kyiv', function () {
  view.animate({
    center: kyiv,
    duration: 2000,
  });
});

onClick('lviv', function () {
  view.animate({
    center: lviv,
    duration: 1000,
    zoom: 10,
  });
});

onClick('odesa', function () {
  view.animate({
    center: odesa,
    duration: 1000,
    zoom: 10,
  });
});

const view = new View({
  center: kyiv,
  zoom: 6,
});

const rasterLayer = new TileLayer({
  source: new OSM(),
});

const map = new Map({
  target: document.getElementById('map'),
  layers: [rasterLayer, vectorLayer],
  view: view,
});

// In case we need fetch data from backend we need change layer of the map like below.
// layers: [
//   new VectorLayer({
//     source: new VectorSource({
//       format: new GeoJSON(),
//       url: 'http://localhost:8080/list',
//     }),
//   }),
// ],
console.log('hi thereddd');

//
