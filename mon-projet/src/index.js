//import $ from 'jquery';
//window.jQuery = window.$ = $;
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility'
import countriesData from '../data/pays.json'
import alcoolData from '../data/deathrate-alcool.json' 
//import tabacData from '../data/deathrate-tabac.json' 
//import drugsData from '../data/deathrate-drugs.json' 


let leafMap = L.map('leafMap').setView([20, 0], 2);
let geoJson
let info = L.control();
let legend = L.control({position: 'bottomright'});


L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 10
}).addTo(leafMap);

function getColor(d) {
    if (sortBy === 'death_tabac'){
        return  d >= 9  ? '#49006a' :
                    d >= 8  ? '#7a0177' :
                    d >= 7	 ? '#ae017e' :
                    d >= 6  ? '#dd3497' :
                    d >= 5  ? '#f768a1' :
                    d >= 4  ? '#fa9fb5' :
                    d >= 3  ? '#fcc5c0' :
                    d >= 2  ? '#fde0dd' :
                               '#FDF3DE';
    }else {
        if(sortBy === 'deathRate'){
            return  d >= 9  ? '#49006a' :
                    d >= 8  ? '#7a0177' :
                    d >= 7	 ? '#ae017e' :
                    d >= 6  ? '#dd3497' :
                    d >= 5  ? '#f768a1' :
                    d >= 4  ? '#fa9fb5' :
                    d >= 3  ? '#fcc5c0' :
                    d >= 2  ? '#fde0dd' :
                               '#FDF3DE';
            }else {
                //(sortBy === 'death_drogues')
            return  d >= 9  ? '#49006a' :
                    d >= 8  ? '#7a0177' :
                    d >= 7	 ? '#ae017e' :
                    d >= 6  ? '#dd3497' :
                    d >= 5  ? '#f768a1' :
                    d >= 4  ? '#fa9fb5' :
                    d >= 3  ? '#fcc5c0' :
                    d >= 2  ? '#fde0dd' :
                               '#FDF3DE';
    }
}
}

function style(feature) {
    return {
        fillColor: getColor(alcoolData.filter(d => d.Entity === feature.properties.name)[0][sortBy]),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geoJson.resetStyle(e.target);
    info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

function reload() {
    leafMap.removeLayer(geoJson);
    leafMap.removeLayer(legend);
    geoJson = L.geoJson(countriesData, {style, onEachFeature}).addTo(leafMap);
    legend.addTo(leafMap);
}

//L.geoJSON(countriesData).addTo(leafMap)
geoJson = L.geoJson(countriesData, {style, onEachFeature}).addTo(leafMap);

//Infos

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Infos</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + alcoolData.filter(d => d.Entity === props.name)[0][sortBy] + 'morts.'
        : 'Survoler un pays');
};

info.addTo(leafMap);


