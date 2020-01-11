// GEOJson link
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
  });
  
// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


// Circle color
function getColor(m) {
  return m > 5  ? '#FF0000' :
         m > 4  ? '#FF7F50' :
         m > 3  ? '#FFA500' :
         m > 2  ? '#FFD700' :
         m > 1  ? '#98FB98' :
                  '#00FF00';
}

// Magnitude impacting circle radius
function markerSize(feature) {
  return Math.sqrt(Math.abs(feature.properties.mag)) * 7;
}

dataFeature = d3.json(url, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  var earthquakes = L.geoJSON(data, {
    // Create circle markers
    pointToLayer: function (feature, latlng) {
      var geojsonMarkerOptions = {
        radius: markerSize(feature),
        fillColor: getColor(feature.properties.mag),
        color: "#000",
        weight: .3,
        opacity: 1,
        fillOpacity: 0.6
      };
        return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup("<h3>" + feature.properties.title + "<h3>")
    }
  }).addTo(myMap);
  
  // Create Legend
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function(map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1, 2, 3, 4, 5],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);
});