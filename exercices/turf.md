# Turf

Audrey Zeugin

------

## Expliquez ce que font chacune des 4 fonctions turf utilisées dans l'exemple avec les bars autour de la HEIG.

Turf.js est une libraire qui oermet de faire des transformations sur des données géographiques.

1. Circle (3 arguments) - choix du périmètre

   1. les coordonnées autour desquelles on souhaite placer/dessiner le cercle
   2. le rayon
   3. la configuration où on décrit l'unité par rapport au rayon

2. bbox (ou "bounding box") - délémitation du périmètre

   1. la longitude minimum et maximum
   2. la latitude minimum et maximum

3. bboxxPolygon

   1. pour dessiner un carré (transformer le périmètre rond en carré)

4. distance

   1. pour calculé la distance (elle prend en compte 3 arguments)

      1. le point de départ
      2. le point d'arrivé
      3. l'unité de mesure (mètre)

      