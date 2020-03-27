# Créer le graphique avec d3

Audrey Zeugin

------

## 1. Comment et pourquoi le code est t-il divisé en plusieurs fichier?

Le code est divisé avec les fichiers suivant dans un dossier src:

- index.html
  - l'endroit où sera dessiner le graphique avec id="graph"
  - l'année qui va être visualisée
- index.css
  - pour le graphisme du graphique
- index.js
  - pour le script que nous avons créer à l'étape précédente
  - importer les donnnées de data.json
  - import des éléments de éléments.js et sales.js
- config.js
  - on définit les dimension du graphique (hauteur, largeur, marges)
- scales.js
  - Pour les échelles sur l'axes des x et y
  - Pour le rayon des bulles (population)
  - mettre à jour les bulles en fnction de l'année
- elements.js
  - ajouter des légendes (années, axes, nom des pays au dessus des bulles) pour ne pas surcharger index.js
  - afficher l'année
  - afficher les axes
  - afficher les nom du pays quand la souris passe sur une bulle (mouseover)

## 2. Comment le nom du pays est t-il afficher quand la souris passe sur une bulle?

- Tant que la souris est sur une bulle le texte reste affiché
- Quand on bouge la souris à l'intérieur d'une bulle, le texte suit au dessus
- On peut distinguer de quelle bulle on parle quand il y en a plusieurs au même endroit grâce à un contour noir autour de la bulle sur laquelle on est.