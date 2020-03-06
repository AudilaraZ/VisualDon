import * as d3 from 'd3'

const WIDTH = 2000
const HEIGHT = 500
const MARGIN = 5

const svg = d3.select('body')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)

const DATA = [
    {
        pays: "Suisse(A)",
        taux: 31.4
    },
    {
        pays: "Suisse(F)",
        taux: 27.4
    },
    {
        pays: "Suisse(I)",
        taux: 31.1
    },
    {
        pays: "Autriche",
        taux: 32.9
    },
    {
        pays: "Belgique(Fla)",
        taux: 37.1
    },
    {
        pays: "Belgique(Fr)",
        taux: 23.2
    },
    {
        pays: "Bulgarie",
        taux: 5.5
    },
    {
        pays: "Danemark",
        taux: 74.6
    },
    {
        pays: "Finlande",
        taux: 43.3
    },
    {
        pays: "France",
        taux: 30.6
    },
    {
        pays: "Allemagne",
        taux: 46.4
    },
    {
        pays: "Hongrie",
        taux: 15.1
    },
    {
        pays: "Italie",
        taux: 36.7
    },
    {
        pays: "Pays-Bas",
        taux: 31.6
    },
    {
        pays: "Norvège",
        taux: 40.5
    },
    {
        pays: "Pologne",
        taux: 28
    },
    {
        pays: "Portugal",
        taux: 15.2
    },
    {
        pays: "Slovaquie",
        taux: 13.9
    },
    {
        pays: "Slovénie",
        taux: 22.4
    },
    {
        pays: "Espagne",
        taux: 24
    },
    {
        pays: "Suède",
        taux: 37
    },
    {
        pays: "Grande-Bretagne",
        taux: 47.2
    }
]


const MARGIN_LEFT = 100
const MARGIN_BOTTOM = 50
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length


const yScale = d3.scaleLinear()
    .domain([0, d3.max(DATA, d => d.taux)])
    .range([HEIGHT - MARGIN_BOTTOM, 0])

const batons = svg.append('g')
    .attr('transform', `translate(${MARGIN_LEFT}, 0)`)

batons.selectAll('rect')
    .data(DATA)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * BAR_WIDTH)
    .attr('width', BAR_WIDTH - MARGIN)
    .attr('y', d => yScale(d.taux))
    .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.taux))
    .attr('fill', 'orange')

batons.selectAll('text')
    .data(DATA)
    .enter()
    .append('text')
    .text(d => d.pays)
    .attr('x', (d, i) => i * BAR_WIDTH + BAR_WIDTH / 2)
    .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
    .attr('text-anchor', 'middle')

const axis = d3.axisLeft(yScale)
    .ticks(5)
    .tickFormat(d => `${d}`)

const gAxis = svg.append('g')
    .attr('transform', `translate(${MARGIN_LEFT * 0.7}, 0)`)
    .call(axis)