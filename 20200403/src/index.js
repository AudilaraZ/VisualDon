import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'

// les fast-food à Sainte-Croix
import fast_foodGeojson from 'fast_food.json'

// initialiser la carte, ici "carte" est l'id de la <div> de notre index.html
const map = L.map('carte')

// le fond de carte, ici nous utilisons celles de openstreetmap.ch
const fondDeCarte = L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	bounds: [[45, 5], [48, 11]]
})

// ajouter le fond de carte à "map"
fondDeCarte.addTo(map)

// la couche avec les fast-food
const coucheFastFood = L.geoJSON(fast_foodGeojson)

// ajouter la couche à "map"
coucheFastFood.addTo(map)

// pour que la carte soit centrée sur les fast-food
map.fitBounds(coucheFastFood.getBounds())