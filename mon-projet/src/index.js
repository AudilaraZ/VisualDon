//Import de la bibliothéque leaflet pour les graphiques avec les cartes
import countries from '../data/countries_badhabits.json'
import L from 'leaflet'

//Import de la bibliothéque billboard pour le graphique en montagne
import "billboard.js/dist/theme/insight.css";
import bb from "billboard.js";


//Import des bibliothèque pour le graphique bar chart race
import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "https://api.observablehq.com/@michelle-po/bar-chart-race.js?v=3";



// la carte
const map = L.map('map').setView([50, 0], 2);

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
const pays = L.geoJson(countries, { style: alcoolStyle, onEachFeature }).addTo(map)

// les boutons qui ont tous la classe "button"
const buttons = Array.from(document.getElementsByClassName('button'))
// la carte affichée, "alcool" par défaut
let mapStyle = 'deathAlcool'
// quand un bouton est cliqué
const onButtonClick = e => {

    //Change le style des boutons lors du click
    $('.button').removeClass('active')
    $(e.target).addClass('active')

    //On cache la carte ET les autres graphiques
    $('#map').hide();
    $('#batons').hide();

    // recupérer la valeur du bouton
    mapStyle = e.target.value
    // style des pays dépendant du bouton
    if (mapStyle === 'deathAlcool') {
        //on affiche la carte
        $('#map').show();

        pays.eachLayer(layer => {
            layer.setStyle(alcoolStyle(layer.feature))
        })
        map.removeControl(legendTabac);
        map.removeControl(legendDrugs);
        map.removeControl(legendAll)
        legendAlcool.addTo(map)
    }
    if (mapStyle === 'deathDrug') {
        //on affiche la carte
        $('#map').show();

        pays.eachLayer(layer => {
            layer.setStyle(drugStyle(layer.feature))
        })
        map.removeControl(legendTabac);
        map.removeControl(legendAlcool);
        map.removeControl(legendAll)
        legendDrugs.addTo(map)
    }
    if (mapStyle === 'deathTabac') {
        //on affiche la carte
        $('#map').show();

        pays.eachLayer(layer => {
            layer.setStyle(tabacStyle(layer.feature))
        })
        map.removeControl(legendAlcool)
        map.removeControl(legendDrugs)
        map.removeControl(legendAll)
        legendTabac.addTo(map)
    }
    if (mapStyle === 'deathAll') {
        //on affiche la carte
        $('#map').show();

        pays.eachLayer(layer => {
            layer.setStyle(allStyle(layer.feature))
        })
        map.removeControl(legendTabac);
        map.removeControl(legendDrugs)
        map.removeControl(legendAlcool)

        legendAll.addTo(map)
    }
    if (mapStyle === 'deathYear') { // mettre le graphique en batons
        // On affiche les graphiques 
        $('#batons').show();
        // on génère le graphique
        generateAreaChart();

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
                ? '<b>' + props.name + '</b><br />' + props.alcool + '</sup>'
                : 'Survoler un pays ')
    }
    if (mapStyle === 'deathDrug') {
        html = '<h4>Taux sur 100.000 habitants en 2017</h4>'
            + (props
                ? '<b>' + props.name + '</b><br />' + props.drug + '</sup>'
                : 'Survoler un pays ')
    }
    if (mapStyle === 'deathTabac') {
        html = '<h4>Taux sur 100.000 habitants en 2017</h4>'
            + (props
                ? '<b>' + props.name + '</b><br />' + props.tabac + '</sup>'
                : 'Survoler un pays ')
    }
    if (mapStyle === 'deathAll') {
        html = '<h4>Taux sur 100.000 habitants en 2017</h4>'
            + (props
                ? '<b>' + props.name + '</b><br />' + (props.alcool + props.drug + props.tabac) + '</sup>'
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

// legende alcool
const legendAlcool = L.control({ position: 'bottomright' });

legendAlcool.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 2, 4, 6, 8, 10, 12, 14, 16, +18],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getAlcoolColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

// legende tabac 
const legendTabac = L.control({ position: 'bottomright' });
legendTabac.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, +250],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getTabacColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

// legende drogue 
const legendDrugs = L.control({ position: 'bottomright' });
legendDrugs.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.5, 1, 2, 3, 4, 5, 10, +15],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getDrugColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

// legende tous 
const legendAll = L.control({ position: 'bottomright' });
legendAll.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, +250],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getAllColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};


// Alcool par défaut, on ajoute la légende au chargement de la carte
legendAlcool.addTo(map)

////////////////////////////////////// Generation du graphique billboard.js ////////////////////////////////
const DATA = [
    { year: "1990" },
    { year: "1991" },
    { year: "1992" },
    { year: "1993" },
    { year: "1994" },
    { year: "1995" },
    { year: "1996" },
    { year: "1997" },
    { year: "1998" },
    { year: "1999" },
    { year: "2000" },
    { year: "2001" },
    { year: "2002" },
    { year: "2003" },
    { year: "2004" },
    { year: "2005" },
    { year: "2006" },
    { year: "2007" },
    { year: "2008" },
    { year: "2009" },
    { year: "2010" },
    { year: "2011" },
    { year: "2012" },
    { year: "2013" },
    { year: "2014" },
    { year: "2015" },
    { year: "2016" },
    { year: "2017" },
];

function generateAreaChart() {
    bb.generate({
        data: {
            columns: [
                [
                    "tabac",
                    29027.92585,
                    28489.88086,
                    28677.60723,
                    28428.57672,
                    28200.04234,
                    27877.88386,
                    27351.6876,
                    26834.44965,
                    26347.2029,
                    25887.35314,
                    25369.54062,
                    24851.84591,
                    24486.98045,
                    24105.83182,
                    23583.62836,
                    23194.80609,
                    22667.9713,
                    22202.19351,
                    21753.31452,
                    21293.33447,
                    20863.79862,
                    20395.26144,
                    19963.33595,
                    19550.78339,
                    19203.70146,
                    19012.17897,
                    18694.33539,
                    18387.06416,
                ],
                [
                    "alcool",
                    668.0317632,
                    688.6658877,
                    717.392197,
                    761.7423148,
                    797.600775,
                    799.6462131,
                    781.0009084,
                    769.4116583,
                    765.5678629,
                    761.0841438,
                    754.8731861,
                    754.8411779,
                    753.2149947,
                    753.8591633,
                    755.6844245,
                    762.693898,
                    747.9095074,
                    733.9723821,
                    718.3536375,
                    695.7013282,
                    682.7025922,
                    665.624862,
                    653.0674215,
                    645.3606724,
                    641.4964589,
                    644.3024266,
                    643.5195291,
                    644.677159,
                ],
                [
                    "drogue",
                    235.5034344,
                    245.9247537,
                    258.9356179,
                    272.8258837,
                    290.6181377,
                    305.8292326,
                    312.8982491,
                    324.543641,
                    335.7984497,
                    343.0405834,
                    351.5697883,
                    351.4683228,
                    351.3224653,
                    350.9293804,
                    352.1207717,
                    356.455282,
                    358.4343813,
                    361.7306591,
                    361.9517784,
                    359.8991461,
                    359.7417027,
                    360.1070079,
                    361.9576956,
                    366.335747,
                    373.5834474,
                    384.9451324,
                    399.6140103,
                    407.7574097,
                ],
            ],
            types: {
                tabac: "area-spline",
                alcool: "area-spline",
                drogue: "area-spline",
            },
        },
        axis: {
            x: {
                type: "category",
                categories: DATA.map(({ year }) => year),
            },
        },
        bindto: "#areaChart",
    });
}


///////////////////////////////////////////////////////// Generation du graphique Bar chart race Observable /////////////////////////////////////////////////////////////

//   <div id="observablehq-6ef2d9cb"></div>
// <script type="module">
// import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
// import define from "https://api.observablehq.com/@michelle-po/bar-chart-race.js?v=3";
const inspect = Inspector.into("#observablehq-6ef2d9cb");
(new Runtime).module(define, name => (name === "chart") && inspect());
// </script>


data = d3.csvParse(await FileAttachment("../data/batons.csv").text(), d3.autoType)

viewof replay = html`<button>Replay`;

chart = {
    replay;

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

    const updateBars = bars(svg);
    const updateAxis = axis(svg);
    const updateLabels = labels(svg);
    const updateTicker = ticker(svg);

    yield svg.node();

    for(const keyframe of keyframes) {
        const transition = svg.transition()
            .duration(duration)
            .ease(d3.easeLinear);

        // Extract the top bar’s value.
        x.domain([0, keyframe[1][0].value]);

        updateAxis(keyframe, transition);
        updateBars(keyframe, transition);
        updateLabels(keyframe, transition);
        updateTicker(keyframe, transition);

        invalidation.then(() => svg.interrupt());
        await transition.end();
    }
}

duration = 60;
n = 3;
names = new Set(data.map(d => d.name));

datevalues = Array.from(d3.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
    .map(([date, data]) => [new Date(date), data])
    .sort(([a], [b]) => d3.ascending(a, b))

function rank(value) {
    const data = Array.from(names, name => ({ name, value: value(name) }));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
    return data;
}
k = 10

keyframes = {
    const keyframes = [];
    let ka, a, kb, b;
    for([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
        const t = i / k;
        keyframes.push([
            new Date(ka * (1 - t) + kb * t),
            rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
        ]);
    }
}
          };
keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
return keyframes;

nameframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.name);

prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)));

function bars(svg) {
    let bar = svg.append("g")
        .attr("fill-opacity", 0.6)
        .selectAll("rect");

    return ([date, data], transition) => bar = bar
        .data(data.slice(0, n), d => d.name)
        .join(
            enter => enter.append("rect")
                .attr("fill", color)
                .attr("height", y.bandwidth())
                .attr("x", x(0))
                .attr("y", d => y((prev.get(d) || d).rank))
                .attr("width", d => x((prev.get(d) || d).value) - x(0)),
            update => update,
            exit => exit.transition(transition).remove()
                .attr("y", d => y((next.get(d) || d).rank))
                .attr("width", d => x((next.get(d) || d).value) - x(0))
        )
        .call(bar => bar.transition(transition)
            .attr("y", d => y(d.rank))
            .attr("width", d => x(d.value) - x(0)));
};

function labels(svg) {
    let label = svg.append("g")
        .style("font", "bold 18px var(--sans-serif)")
        .style("font-variant-numeric", "tabular-nums")
        .attr("text-anchor", "end")
        .selectAll("text");

    return ([date, data], transition) => label = label
        .data(data.slice(0, n), d => d.name)
        .join(
            enter => enter.append("text")
                .attr("transform", d => `translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`)
                .attr("y", y.bandwidth() / 2)
                .attr("x", -6)
                .attr("dy", "-0.25em")
                .text(d => d.name)
                .call(text => text.append("tspan")
                    .attr("fill-opacity", 0.7)
                    .attr("font-weight", "normal")
                    .attr("x", -6)
                    .attr("dy", "1.15em")),
            update => update,
            exit => exit.transition(transition).remove()
                .attr("transform", d => `translate(${x((next.get(d) || d).value)},${y((next.get(d) || d).rank)})`)
                .call(g => g.select("tspan").tween("text", d => textTween(d.value, (next.get(d) || d).value)))
        )
        .call(bar => bar.transition(transition)
            .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
            .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))));
}

function textTween(a, b) {
    const i = d3.interpolateNumber(a, b);
    return function (t) {
        this.textContent = formatNumber(i(t));
    };
};

formatNumber = d3.format(",d");

function axis(svg) {
    const g = svg.append("g")
        .attr("transform", `translate(0,${margin.top})`);

    const axis = d3.axisTop(x)
        .ticks(width / 160)
        .tickSizeOuter(0)
        .tickSizeInner(-barSize * (n + y.padding()));

    return (_, transition) => {
        g.transition(transition).call(axis);
        g.select(".tick:first-of-type text").remove();
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
        g.select(".domain").remove();
    };
};

function ticker(svg) {
    const now = svg.append("text")
        .style("font", `bold 70px var(--sans-serif)`)
        .style("font-variant-numeric", "tabular-nums")
        .attr("text-anchor", "end")
        .attr("x", width - 6)
        .attr("y", margin.top + barSize * (n - 0.45))
        .attr("dy", "0.32em")
        .text(formatDate(keyframes[0][0]));

    return ([date], transition) => {
        transition.end().then(() => now.text(formatDate(date)));
    };
};

formatDate = d3.utcFormat("%Y");

color = {
    const scale = d3.scaleOrdinal(d3.schemeTableau10);
    return d => scale(d.name);
};

x = d3.scaleLinear([0, 1], [margin.left, width - margin.right]);

y = d3.scaleBand()
    .domain(d3.range(n + 1))
    .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
    .padding(0.1);

height = margin.top + barSize * n + margin.bottom;

barSize = 70;

margin = ({ top: 16, right: 6, bottom: 6, left: 0 });

d3 = require("d3@5", "d3-array@2");


