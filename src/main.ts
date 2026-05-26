import './style.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import 'omt-router/dist/omt-router.css'
import maplibregl from 'maplibre-gl'
import {
  MapLibreRoutingControl,
  route
} from 'omt-router'

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tile.openstreetmap.jp/styles/maptiler-toner-en/style.json',
  center: [0, 0],
  zoom: 2,
  hash: true,
})

map.addControl(
  new MapLibreRoutingControl({
    maplibre: maplibregl,
    routeFunction: route,
    tileJsonUrl: 'https://tile.openstreetmap.jp/data/planet.json'
  }),
  'top-left'
)
