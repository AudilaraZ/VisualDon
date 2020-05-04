const fs = require('fs');

const fichier = fs.readFileSync('badhabits_2017.csv', 'utf-8');


const result = fichier
    .split('\n')
    .map(ligne => ligne.split(';'))
    .map(d => ({
        Entity: d[0],
        Code: d[1],
        Year: Number(d[2]),
        death_tabac: Number(d[3].trim().split(',').join('.')),
        death_alcool: Number(d[4].trim().split(',').join('.')),
        death_drug: Number(d[5].trim().split(',').join('.'))
    }))

console.log(
    JSON.stringify(result, null, 2)
)