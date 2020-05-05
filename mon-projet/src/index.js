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
    return d > 18 ? '#7f0000' :
        d > 16 ? '#b30000' :
            d > 14 ? '#d7301f' :
                d > 12 ? '#ef6548' :
                    d > 10 ? '#fc8d59' :
                        d > 8 ? '#fdbb84' :
                            d > 6 ? '#fdd49e' :
                                d > 4 ? '#fee8c8' :
                                    d > 2 ? '#fff7ec' :
                                        '#ffffff';
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
    return d > 15 ? '#662506' :
        d > 10 ? '#993404' :
            d > 5 ? '#cc4c02' :
                d > 4 ? '#ec7014' :
                    d > 3 ? '#fe9929' :
                        d > 2 ? '#fec44f' :
                            d > 1 ? '#fee391' :
                                d > 0.5 ? '#fff7bc' :
                                    '#ffffe5';
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
    return d > 250 ? '#800026' :
        d > 225 ? '#bd0026' :
            d > 200 ? '#e31a1c' :
                d > 175 ? '#fc4e2a' :
                    d > 150 ? '#fd8d3c' :
                        d > 125 ? '#feb24c' :
                            d > 100 ? '#fed976' :
                                d > 75 ? '#ffeda0' :
                                    d > 50 ? '#ffffcc' :
                                        d > 25 ? '#fcfcef' :
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
    return d > 250 ? '#67000d' :
        d > 225 ? '#a50f15' :
            d > 200 ? '#cb181d' :
                d > 175 ? '#ef3b2c' :
                    d > 150 ? '#fb6a4a' :
                        d > 125 ? '#fc9272' :
                            d > 100 ? '#fcbba1' :
                                d > 75 ? '#fee0d2' :
                                    d > 59 ? '#fff5f0' :
                                        d > 25 ? '#fcfcef' :
                                            '#FFFFFF';
}

function allStyle(feature) {
    return {
        fillColor: getAllColor(feature.properties.drug + feature.properties.alcool + feature.properties.tabac), // à changer en fonction du document
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.8
    };
}

// tous les pays
// par défaut, le style affiché quand la page charge, est le style "alcool"
const pays = L.geoJson(countries, {style: alcoolStyle, onEachFeature }).addTo(map)
// les boutons qui ont tous la classe "button"
const buttons = Array.from(document.getElementsByClassName('button'))
// la carte affichée, "alcool" par défaut
let mapStyle = 'deathAlcool'
// quand un bouton est cliqué
const onButtonClick = e => {
  // recupérer la valeur du bouton
  mapStyle = e.target.value
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
    if (mapStyle === 'deathYear') { // mettre le graphique en batons
        pays.eachLayer(layer => {
            layer.setStyle(allStyle(layer.feature))
        })
    }
}
// ajouter l'évenment "onButtonClick" à tous les boutons
buttons.map(button => button.addEventListener('click', onButtonClick))


//////////////////////////////////////////////// INFOS ////////////////////////////////////////////////

// 
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  let html = ''
  if (mapStyle === 'deathAlcool') {
    html = '<h4>Taux sur 100.000 habitants en 2017</h4>'
      + (props
        ? '<b>' + props.name + '</b><br />' + props.alcool +'</sup>'
        : 'Survoler un pays ')
  }
  if (mapStyle === 'deathDrug') {
    html = '<h4>Taux sur 100.000 habitants en 2017</h4>'
      +  (props
        ? '<b>' + props.name + '</b><br />' + props.drug +'</sup>'
        : 'Survoler un pays ')
  }
  if (mapStyle === 'deathTabac') {
    html = '<h4>Taux sur 100.000 habitants en 2017</h4>'
      +  (props
        ? '<b>' + props.name + '</b><br />' + props.tabac +'</sup>'
        : 'Survoler un pays ')
  }
  if (mapStyle === 'deathAll') {
    html = '<h4>Taux sur 100.000 habitants en 2017</h4>'
      +  (props
        ? '<b>' + props.name + '</b><br />' + (props.alcool + props.drug + props.tabac) +'</sup>'
        : 'Survoler un pays ')
  }
  this._div.innerHTML = html
}

info.addTo(map);


//////////////////////////////////////////////// FONCTION SURVOLE AVEC LA SOURIS ////////////////////////////////////////////////

function highlightFeature(e) {
  var layer = e.target
  layer.setStyle({
      weight: 4,
  })
  info.update(layer.feature.properties)
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
function resetHighlight(e) {
  var layer = e.target
  layer.setStyle({
    weight: 1,
  })
  info.update()
}
function zoomToFeature(e) {
  var layer = e.target
  map.fitBounds(layer.getBounds())
  info.update(layer.feature.properties)
}
function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}

//////////////////////////////////////////////// LEGENDE ////////////////////////////////////////////////

//legende  // ne marche pas
const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'info legend')
    if (mapStyle === 'deathAlcool') {
        grades = [0, 2, 4, 6, 8, 10, 12, 14, 16, +18],
        labels = [];
    }
    if (mapStyle === 'deathDrug'){
        grades = [0, 0.5, 1, 2, 3, 4, 5, 10, +15],
        labels = [];
    }
    if (mapStyle === 'deathTabac'){
        grades = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, +250],
        labels = [];
    }
    if (mapStyle === 'deathAll'){
        grades = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, +250],
        labels = [];
    }
    // loop through our density intervals and generate a label with a colored square for each interval
    for (const i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]+1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


