const fs = require('fs');

const fichier = fs.readFileSync('data.csv', 'utf-8');

const result = fichier
    .split('\n')
    .map(ligne => ligne.split('\t'))
    .map(d => ({
        pays: d[0],
        taux: Number(d[1].trim().split(',').join('.'))
    }))

console.log(
    JSON.stringify(result, null, 2)
)