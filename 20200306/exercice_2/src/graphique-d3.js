import * as d3 from 'd3';

const width = 800;
const height = 400;

const l1 = [
    { name: 'Français', value: 22.4 },
    { name: 'Suisse-Allemand', value: 63.0 },
    { name: 'Italien', value: 8.1 },
    { name: 'Romanche', value: 0.5 },
]

const getPieData = d3.pie().value(d => d.value)

const pieData = getPieData(l1)
console.log(pieData);
const arcCreator = d3.arc()
    .innerRadius(50)
    .outerRadius(height / 2 - 10) // pour que tout mon donuts soit visible

const color = ({ data }) => {
    switch (data.name) {
        case 'Français': return 'purple'
        case 'Suisse-Allemand': return 'gold'
        case 'Italien': return 'red'
        default: return 'green'
    }
}



const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

const pie = svg.append('g')
    .attr('transform', `translate(${height / 2}, ${height/ 2})`)

pie.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arcCreator)
    .attr('fill', color)
   
// un texte pour chaque tranche
pie.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    // .centroid permet de trouver le centre de la tranche
    .attr('transform', d => `translate(${arcCreator.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.value)

// la légende
const legend = svg.append('g')
    .attr('transform', `translate(${height - 10})`)

const RECT_WIDTH = 20

// les carrés de couleur
legend.selectAll('rect')
    .data(pieData)
    .enter()
    .append('rect')
    .attr('y', (d, i) => i * RECT_WIDTH)
    .attr('width', RECT_WIDTH)
    .attr('height', RECT_WIDTH)
    .attr('fill', color)

// les noms des langues en Suisse
legend.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('x', RECT_WIDTH * 1.5)
    .attr('y', (d, i) => i * RECT_WIDTH + RECT_WIDTH * 0.75)
    .attr('width', RECT_WIDTH)
    .attr('height', RECT_WIDTH)
    .text(d => d.data.name)

  