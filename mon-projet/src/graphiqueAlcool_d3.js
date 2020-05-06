// importer les fonctions "d3"
import { select, geoNaturalEarth1, geoPath } from 'd3'

// importer les pays
import countries from '../data/countries.json'
import deathrateAlcool from '../data/deathrate-alcool.json'

export default carte => {
    const div = select(`#${carte}`)

// dessiner le graphique

const cleanDeathRate = deathrateAlcool.filter(d => d.Year === 2017).filter(d => d.Code !== "")

const getDeathRateByCountry = (countryCode) => cleanDeathRate.find(d => d.Code === countryCode)

const getFillByCountry = ({properties}) => {
  if(typeof getDeathRateByCountry(properties.iso_a3) !== 'undefined') { 
  return getDeathRateByCountry(properties.iso_a3).deathRate > 5.00 
    ? 'red' : 'orange'
  }else{
    return 'black';
  }
} 

// définir la taille du svg
const WIDTH = 1280
const HEIGHT = 720

// ajouter un <svg> à la <div id="carte">
const svg = select('#carte').append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

// définir la projection pour faire entrer tous les pays dans le <svg>
const projection = geoNaturalEarth1().fitExtent([[0, 0], [WIDTH, HEIGHT]], countries)

// définir le créateur d'attribut "d" pour l'élément <path>
const pathCreator = geoPath().projection(projection)

// ajouter un <path> par pays au <svg>
svg.selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', pathCreator)
    .attr('fill',getFillByCountry)
    .attr('stroke','black')

// les coordonnées de la gare d'Yverdon
//const yverdon = [6.64123, 46.78109]

// pour projeter un point, nous devons utiliser la projection directement
//svg.append('circle')
//  .attr('cx', projection(yverdon)[0])
//  .attr('cy', projection(yverdon)[1])
//  .attr('r', 10)
//  .attr('fill', 'hotpink')

}