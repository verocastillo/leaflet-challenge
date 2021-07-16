// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Data source URL
var eqURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Color function for markers
function getColor(x) {
    if (x < 1) { return "Maroon";}
    if (x < 2.5) {return "Sienna"}
    if (x < 4) {return "OrangeRed"}
    if (x < 5.5) {return "Orange"}
    if (x < 7) {return "Gold"}
};

// Size function for markers
function mSize(x) {
    return x * 3 ;
};

