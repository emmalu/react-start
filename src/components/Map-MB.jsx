import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// import basemap url from constants.json
import { MAPBOX_BASEMAP_URL } from "../utils/constants.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW1tYWx1IiwiYSI6ImNreWY3cDZhYTA1dGoybm44dm55Zjk1azMifQ.aYUfOucNMMszINnvfmzDrQ";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lng, setLng] = useState(-79.95); //chs
  // const [lat, setLat] = useState(32.8); //chs
  const [lng, setLng] = useState(-9.1143); //lisboa
  const [lat, setLat] = useState(38.7332); //lisboa
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    const epsg = 4326; //3857
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_BASEMAP_URL, // stylesheet location
      // project: `EPSG:${epsg}`,
      // style: BASEMAP_URL, // stylesheet location
      center: [lng, lat],
      zoom: zoom,
      minZoom: 13,
      maxZoom: 18,
      //set camera to 45 deg
      pitch: 90,
      bearing: 0,
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      // add additional layers

      map.current.addSource("tec-buildings-data", {
        type: "geojson",
        data: "./data/buildings_proj4326.geojson",
      });
      map.current.addLayer({
        id: "tec-buildings",
        source: "tec-buildings-data",
        filter: ["!=", "name", ""],
        type: "fill-extrusion",
        paint: {
          "fill-extrusion-color": "#088",
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14,
            0,
            14.05,
            ["*", ["get", "floors_ag"], 10],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14,
            0,
            14.05,
            ["get", "floors_ag"],
          ],
          "fill-extrusion-opacity": 0.75,
        },
      });
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
