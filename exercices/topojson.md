# Topojson

Audrey Zeugin

------

## À quoi sert le format topojson et en quoi il diffère du format geojson ?

Il sert à représenter des données géographique, comme le geojson (s'en est même un extension)

Mais, il est plus compact, les fichiers sont plus petit (prend moins de place pour la même quantité d'informations)

Les géométires sont des arcs et pas une série de points

La .feature() permet de tirer les objets d'une collection geojson d'un topojson

la fonction .typology() prends une liste de goejson et la transforme en topojson

la fonction .mesh() permet d'extraire les les lignes d'un topojson et le retourner en geojson en type MultiLineString

la fonction .merg() permet d'associer deux géométrie topojson

Il élimine les redondances.

