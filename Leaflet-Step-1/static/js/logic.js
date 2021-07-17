// Creating map object
var myMap = L.map("map", {
    center: [38.5522, -100.2437],
    zoom: 5
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
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create query and call function
d3.json(queryUrl).then(function(data) {
    getMap(data.features);
  });

// Function for markers
function getMap(data) {
    // Create arrays
    var earthquakeinfo = [];
    for (var i = 0; i < data.length; i++) {
        earthquakeinfo.push({
        longitude: data[i].geometry.coordinates[0],
        latitude: data[i].geometry.coordinates[1],
        magnitude: data[i].properties.mag,
    })}
    // Check dictionary
    console.log(earthquakeinfo)
    console.log(typeof earthquakeinfo[0].magnitude)
    // Add markers
    for (var i = 0; i < earthquakeinfo.length; i++) {
        L.circleMarker([earthquakeinfo[i].latitude, earthquakeinfo[i].longitude], {
            color: "black",
            fillColor: getColor(earthquakeinfo[0].magitude),
            fillOpacity: 0.8,
            radius: earthquakeinfo[0].magnitude * 2.5
        }).addTo(myMap);
      }
      return false;

}

// Color function for markers
function getColor(magnitude) {
    if (magnitude < 1.2) {return "maroon";}
    if (magnitude < 2.4) {return "brickred"}
    if (magnitude < 3.6) {return "orangered"}
    if (magnitude < 4.8) {return "orange"}
    if (magnitude < 6.0) {return "old"}
};



