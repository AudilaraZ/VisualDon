import countries from '../data/countries_badhabits.json'
import L from 'leaflet'
// la carte
const map = L.map('map').setView([20, 0], 2);
// le fond de carte
L.tileLayer('https://api.maptiler.com/maps/positron/{z}/{x}/{y}.png?key=eiKhCNn6PEp5PueYXKV5', {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    crossOrigin: true
}).addTo(map)
// style pour la carte "alcool"
function getAlcoolColor(d) {
    return d > 18 ? '#081d58' :
        d > 16 ? '#253494' :
            d > 14 ? '#225ea8' :
                d > 12 ? '#1d91c0' :
                    d > 10 ? '#41b6c4' :
                        d > 8 ? '#7fcdbb' :
                            d > 6 ? '#c7e9b4' :
                                d > 4 ? '#edf8b1' :
                                    d > 2 ? '#ffffd9' :
                                        '#fcfcef';
}
function alcoolStyle(feature) {
    return {
        fillColor: getAlcoolColor(feature.properties.alcool),
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.8
    }
}

// style pour la carte "drogues"
function getDrugColor(d) {
    return d > 15 ? '#084594' :
        d > 10 ? '#2171b5' :
            d > 5 ? '#4292c6' :
                d > 4 ? '#6baed6' :
                    d > 3 ? '#9ecae1' :
                        d > 2 ? '#c6dbef' :
                            d > 1 ? '#deebf7' :
                                d > 0.5 ? '#f7fbff' :
                                    '#FFFFFF';
}
function drugStyle(feature) {
    return {
        fillColor: getDrugColor(feature.properties.drug),
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.8
    };
}
// style pour la carte "tabac"
function getTabacColor(d) {
    return d > 250 ? '#49006a' :
        d > 225 ? '#7a0177' :
            d > 200 ? '#ae017e' :
                d > 275 ? '#dd3497' :
                    d > 150 ? '#f768a1' :
                        d > 125 ? '#fa9fb5' :
                            d > 100 ? '#fcc5c0' :
                                d > 75 ? '#fde0dd' :
                                    d > 50 ? '#fff7f3' :
                                        d > 25 ? '#f7fbff' :
                                            '#FFFFFF';
}

function tabacStyle(feature) {
    return {
        fillColor: getTabacColor(feature.properties.tabac),
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.8
    };
}
// style pour la carte "tous"
function getAllColor(d) {
    return d > 200 ? '#000000' :
        d > 150 ? '#252525' :
            d > 100 ? '#969696' :
                d > 75 ? '#969696' :
                    d > 50 ? '#bdbdbd' :
                        d > 25 ? '#d9d9d9' :
                            '#FFFFFF';
}
function allStyle(feature) {
    return {
        fillColor: getAllColor(feature.properties.tabac), // à changer en fonction du document
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.8
    };
}

// tous les pays
// par défaut, le style affiché quand la page charge, est le style "alcool"
const pays = L.geoJson(countries, { style: alcoolStyle }).addTo(map)
// les boutons qui ont tous la classe "button"
const buttons = Array.from(document.getElementsByClassName('button'))
// quand un bouton est cliqué
const onButtonClick = e => {
    // recupérer la valeur du bouton
    const mapStyle = e.target.value
    // style des pays dépendant du bouton
    if (mapStyle === 'deathAlcool') {
        pays.eachLayer(layer => {
            layer.setStyle(alcoolStyle(layer.feature))
        })
    }
    if (mapStyle === 'deathDrug') {
        pays.eachLayer(layer => {
            layer.setStyle(drugStyle(layer.feature))
        })
    }
    if (mapStyle === 'deathTabac') {
        pays.eachLayer(layer => {
            layer.setStyle(tabacStyle(layer.feature))
        })
    }
    if (mapStyle === 'deathAll') {
        pays.eachLayer(layer => {
            layer.setStyle(allStyle(layer.feature))
        })
    }
    if (mapStyle === 'deatYear') { // mettre le graphique en batons
        pays.eachLayer(layer => {
            layer.setStyle(allStyle(layer.feature))
        })
    }
}
// ajouter l'évenment "onButtonClick" à tous les boutons
buttons.map(button => button.addEventListener('click', onButtonClick))


//////////////////////////////////////////////// INFOS ////////////////////////////////////////////////


//pop up pays et leurs données

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    if (mapStyle === 'deathAlcool') {
    this._div.innerHTML = '<h4>Taux sur 100.000 habitants en 2017</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.alcool +'</sup>'
        : 'survoler sur pays ');
    }
    if (mapStyle === 'deathDrug') {
        this._div.innerHTML = '<h4>Taux sur 100.000 habitants en 2017</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + props.drug +'</sup>'
            : 'Passer sur un étas');
    }
    if (mapStyle === 'deathTabac') {
        this._div.innerHTML = '<h4>Taux sur 100.000 habitants en 2017</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + props.tabac +'</sup>'
            : 'Passer sur un étas');
    }
    if (mapStyle === 'deathAll') {
        this._div.innerHTML = '<h4>Taux sur 100.000 habitants en 2017</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + props.all +'</sup>'// à changer
            : 'Passer sur un étas');
    }
};

info.addTo(map);



//////////////////////////////////////////////// FONCTION AVEC LA SOURIS ////////////////////////////////////////////////

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


//////////////////////////////////////////////// LEGENDE ////////////////////////////////////////////////


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
