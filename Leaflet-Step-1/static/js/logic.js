// Creating map object
var myMap = L.map("map", {
    center: [0, -10],
    zoom: 2
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
    // Add markers
    for (var i = 0; i < earthquakeinfo.length; i++) {
        L.circleMarker([earthquakeinfo[i].latitude, earthquakeinfo[i].longitude], {
            color: getColor(earthquakeinfo[i].magnitude),
            fillColor: getColor(earthquakeinfo[i].magnitude),
            fillOpacity: 0.8,
            radius: earthquakeinfo[i].magnitude * 2.5
        }).addTo(myMap);
      }
      return false;

}

// Color function for markers
function getColor(mag) {
    if (mag >= 5) {
        return "Maroon";
    }
    if (mag < 5 && mag >=  4) {
        return "FireBrick";
    }
    if (mag < 4 && mag >= 3) {
        return "OrangeRed";
    }
    if (mag < 3 && mag >= 2) {
        return "Orange";
    }
    if (mag < 2 && mag > 1) {
        return "Gold";
    }
    if (mag < 1) {
        return "Yellow";
    }
};


