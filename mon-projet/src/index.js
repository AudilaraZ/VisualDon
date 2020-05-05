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
    return d > 15 ? '#081d58' :
        d > 10 ? '#253494' :
            d > 5 ? '#225ea8' :
                d > 4 ? '#1d91c0' :
                    d > 3 ? '#41b6c4' :
                        d > 2 ? '#7fcdbb' :
                            d > 1 ? '#c7e9b4' :
                                d > 0.5 ? '#edf8b1' :
                                    '#ffffd9';
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
    return d > 250 ? '#081d58' :
        d > 225 ? '#253494' :
            d > 200 ? '#225ea8' :
                d > 175 ? '#1d91c0' :
                    d > 150 ? '#41b6c4' :
                        d > 125 ? '#7fcdbb' :
                            d > 100 ? '#c7e9b4' :
                                d > 75 ? '#edf8b1' :
                                    d > 59 ? '#ffffd9' :
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
    return d > 250 ? '#081d58' :
        d > 225 ? '#253494' :
            d > 200 ? '#225ea8' :
                d > 175 ? '#1d91c0' :
                    d > 150 ? '#41b6c4' :
                        d > 125 ? '#7fcdbb' :
                            d > 100 ? '#c7e9b4' :
                                d > 75 ? '#edf8b1' :
                                    d > 59 ? '#ffffd9' :
                                        d > 25 ? '#fcfcef' :
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
    if (mapStyle === 'deathYear') { // mettre le graphique en batons
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
    this._div.innerHTML = '<h4>Taux sur 100.000 habitants en 2017</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.alcool +'</sup>'
        : 'survoler sur pays ');
};

info.addTo(map);


//////////////////////////////////////////////// LEGENDE ////////////////////////////////////////////////

//legende
const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 2, 4, 6, 8, 10, 12, 14, 16, +18],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (const i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]+1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


//////////////////////////////////////////////// FONCTION SURVOLE AVEC LA SOURIS ////////////////////////////////////////////////

// L.geoJson(countries, { style: style }).addTo(map);
// // highlight, quand je passe par dessus avec la souris
// function highlightFeature(e) {
//     const layer = e.target;

//     layer.setStyle({
//         weight: 4,
//         color: '#666',
//         fillOpacity: 0.7,
//         fillColor: 'pink'
//     });



//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
//     info.update(layer.feature.properties);
// }

// // en plus...

// const geojson;

// function resetHighlight(e) {
//     geojson.resetStyle(e.target);
// }

// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
//     info.update();
// }

// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature
//     });
// }

// geojson = L.geoJson(countries, {
//     style: style,
//     onEachFeature: onEachFeature
// }).addTo(map);
