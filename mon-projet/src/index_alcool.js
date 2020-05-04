import countries from '../data/countries_badhabits.json'
import L from 'leaflet'
//import 'leaflet-defaulticon-compatibility'
var map = L.map('map').setView([20, 0], 2);

      L.tileLayer('https://api.maptiler.com/maps/positron/{z}/{x}/{y}.png?key=eiKhCNn6PEp5PueYXKV5',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        crossOrigin: true
      }).addTo(map);


//pop up pays et leurs données

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Taux sur 100.000 habitants en 2017</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.alcool +'</sup>'
        : 'survoler sur pays ');
};

info.addTo(map);


// mettre des couleurs différentes en fonction du taux

function getColor(d) {
  return d > 18 ? '#081d58' :
         d > 16  ? '#253494' :
         d > 14  ? '#225ea8' :
         d > 12  ? '#1d91c0' :
         d > 10   ? '#41b6c4' :
         d > 8   ? '#7fcdbb' :
         d > 6   ? '#c7e9b4' :
         d > 4   ? '#edf8b1' :
         d > 2   ? '#ffffd9' :
                    '#fcfcef';
}










function style(feature) {
    return {
        fillColor: getColor(feature.properties.alcool),
        weight: 1,
        opacity: 1,
        color: 'grey',
        fillOpacity: 0.8
    };
}

L.geoJson(countries, {style: style}).addTo(map);


// highlight, quand je passe par dessus avec la souris
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 4,
      color: '#666',
      fillOpacity: 0.7,
      fillColor:'yellow'
  });



  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

// en plus...

var geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
  info.update();
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}

geojson = L.geoJson(countries, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);


//legende
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 2, 4, 6, 8, 10, 12, 14, 16, +18],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]+1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);