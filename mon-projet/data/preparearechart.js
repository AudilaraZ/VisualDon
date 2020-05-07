const fs = require('fs');

const fichier = fs.readFileSync('batons.csv', 'utf-8');


const result = fichier
    .split('\n')
    .map(ligne => ligne.split(';'))
    .map(d => ({
        name: d[0],
        Year1991: Number(d[1].trim().split(',').join('.')),
        Year1990: Number(d[2].trim().split(',').join('.')),
        Year1992: Number(d[3].trim().split(',').join('.')),
        Year1993: Number(d[4].trim().split(',').join('.')),
        Year1994: Number(d[5].trim().split(',').join('.')),
        Year1995: Number(d[6].trim().split(',').join('.')),
        Year1996: Number(d[7].trim().split(',').join('.')),
        Year1997: Number(d[8].trim().split(',').join('.')),
        Year1998: Number(d[9].trim().split(',').join('.')),
        Year1999: Number(d[10].trim().split(',').join('.')),
        Year2000: Number(d[11].trim().split(',').join('.')),
        Year2001: Number(d[12].trim().split(',').join('.')),
        Year2002: Number(d[13].trim().split(',').join('.')),
        Year2003: Number(d[14].trim().split(',').join('.')),
        Year2004: Number(d[15].trim().split(',').join('.')),
        Year2005: Number(d[16].trim().split(',').join('.')),
        Year2006: Number(d[17].trim().split(',').join('.')),
        Year2007: Number(d[18].trim().split(',').join('.')),
        Year2008: Number(d[19].trim().split(',').join('.')),
        Year2009: Number(d[20].trim().split(',').join('.')),
        Year2010: Number(d[21].trim().split(',').join('.')),
        Year2011: Number(d[22].trim().split(',').join('.')),
        Year2012: Number(d[23].trim().split(',').join('.')),
        Year2013: Number(d[24].trim().split(',').join('.')),
        Year2014: Number(d[25].trim().split(',').join('.')),
        Year2015: Number(d[26].trim().split(',').join('.')),
        Year2016: Number(d[27].trim().split(',').join('.')),
        Year2017: Number(d[28].trim().split(',').join('.'))
    }))

console.log(
    JSON.stringify(result, null, 2)
)