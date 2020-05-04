const fs = require('fs');

const fichier = fs.readFileSync('batons.csv', 'utf-8');


const result = fichier
    .split('\n')
    .map(ligne => ligne.split(';'))
    .map(d => ({
        Date: d[0],
        name: d[1],
        value: Number(d[2].trim().split(',').join('.')),
    }))

console.log(
    JSON.stringify(result, null, 2)
)