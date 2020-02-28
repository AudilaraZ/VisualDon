/**
 * Autre façon de faire
const obj = { canton: 'Vaud', parti: 'PLR', elus: 5}

const { canton } = obj

*/


const fs = require('fs');

const fichier = fs.readFileSync('data.csv', 'utf-8');

const result = fichier
.split('\n')
.map(ligne => ligne.split(';'))
.map(d => ({
    canton : d[2],
    parti: d[5],
    elus: Number(d[12])
}))
.filter(d => d.canton === 'Vaud' && d.elus > 0)
.map(({parti, elus})=>({parti, elus}))

console.log(
    JSON.stringify(result, null, 2)
);


/*console.log(
    fichier
    .split('\n')
    .map(ligne => ligne.split(';'))
    .map(d => ({
        canton : d[2],
        parti: d[5],
        elus: Number(d[12])
    }))
    .filter(d => d.canton === 'Vaud' && d.elus > 0)
    .map(({parti, elus})=>({parti, elus}))
    //.map(d => ({parti: d.parti, parti: d.parti}))
    );
*/
    /*
    indexes
    2 cantons
    5 parti
    12 élus
    */