const fs = require('fs');

const fichier = fs.readFileSync('areachart.csv', 'utf-8');


const result = fichier
    .split('\n')
    .map(ligne => ligne.split(';'))
    .map(d => ({
        Valori: d[0],
        Year1991: Number(d[1]),
        Year1990: Number(d[2]),
        Year1992: Number(d[3]),
        Year1993: Number(d[4]),
        Year1994: Number(d[5]),
        Year1995: Number(d[6]),
        Year1996: Number(d[7]),
        Year1997: Number(d[8]),
        Year1998: Number(d[9]),
        Year1999: Number(d[10]),
        Year2000: Number(d[11]),
        Year2001: Number(d[12]),
        Year2002: Number(d[13]),
        Year2003: Number(d[14]),
        Year2004: Number(d[15]),
        Year2005: Number(d[16]),
        Year2006: Number(d[17]),
        Year2007: Number(d[18]),
        Year2008: Number(d[19]),
        Year2009: Number(d[20]),
        Year2010: Number(d[21]),
        Year2011: Number(d[22]),
        Year2012: Number(d[23]),
        Year2013: Number(d[24]),
        Year2014: Number(d[25]),
        Year2015: Number(d[26]),
        Year2016: Number(d[27]),
        Year2017: Number(d[28])
    }))

console.log(
    JSON.stringify(result, null, 2)
)