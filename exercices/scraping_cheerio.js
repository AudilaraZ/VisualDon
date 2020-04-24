const cheerio = require('cheerio')
const fs = require('fs')

const page = fs.readFileSync('page.html', 'utf-8')

const $ = cheerio.load(page)

// un article avec prix et nom est dans une classe caption
const caption = $('.col-md-9 > div:nth-child(2)')

//Je veux toute les divs (row) qui contiennent la div (thumbnail) qui contient la classe caption
const divs = $('div.caption', caption)

let result = []

divs.each((index, h4) => {
  if (index !== 0) {
    result.push({
      titre: $('.title', h4).attr('title'),
      prix: $('.price', h4).text()
    })
  }
})

console.log(
    result.map(d => ({Nom: d.titre, Prix: d.prix }))
)