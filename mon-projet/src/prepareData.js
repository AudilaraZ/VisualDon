const fs = require('fs');

const fichier = fs.readFileSync('alcool_2017.csv', 'utf-8');

const result = fichier
    .split('\n')
    .map(ligne => ligne.split(';'))
    .map(d => ({
        pays: d[0],
        morts: Number(d[1].trim().split(',').join('.'))
    }))

console.log(
    JSON.stringify(result, null, 2)
)