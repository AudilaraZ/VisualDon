const fs = require('fs');

const fichier = fs.readFileSync('alcool.csv', 'utf-8');

const result = fichier
    .split('\n')
    .map(ligne => ligne.split(','))
    .map(d => ({
        Entity: d[0],
        Code: d[1],
        Year: Number(d[2]),
        deathRate: Number(d[3].trim().split(',').join('.'))
    }))

console.log(
    JSON.stringify(result, null, 2)
)