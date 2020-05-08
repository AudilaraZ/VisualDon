# Projet de fin de cours

**Majka Voide, Audrey Zeugin & Michelle Ponti**  

VisualDon | M47 | Comem+ | Heig-vd | 2020

------

Pour le projet de fin de cours, nous avons voulu représenter graphiquement l'ampleur en terme de mortalité des trois plus mauvaises habitudes répandues dans monde: l'alcool, le tabac et les drogues.
En tant que jeunes, il est parfois difficile de se rendre compte de ces problèmes et de leur impact dévastateur. Avec ces graphiques, nous montrons visuellement l'évolution à l'échelle mondiale des dégâts causés par ces habitudes ancrées dans notre société

## **D'où viennent les données**

Les données viennent de [ourworldindata.org](), un site spécialisé en données démographiques. Plus spécifiquement:

- Pour les données relatives aux drogues:
  [https://ourworldindata.org/grapher/death-rates-from-drug-use-disorders](https://ourworldindata.org/grapher/death-rates-from-drug-use-disorders)

- Pour les données relatives au tabac:
  https://ourworldindata.org/grapher/death-rate-smoking?tab=map

- Pour les données relatives à l'alcool:
  https://ourworldindata.org/grapher/death-rate-smoking?tab=maphttps://ourworldindata.org/grapher/death-rates-from-alcohol-use-disorders

Les trois jeux des données sont dans le même format: pour chaque pays il y a le taux de mortalité de la cause sur 100'000 habitants depuis 1990 jusqu'à 2017. 

### **Notre idée:**

Avec ces données, nous aimerions construire des maps du monde interactives avec la bibliotèque Javascript pour la cartographie **Leaflet**. On montrera plus précisement pour chaque pays le taux de mortalité sur 100'000 personnes au travers des trois differentes causes en 2017. Ainsi, 3 graphiques et un de plus qui somme les taux des 3 causes pour voir les pays avec les plus hauts totales seront représentés.

En suite, nous avons ajouté un graphique dynamique **avec d3** qui s'appel "bart chart race". Avec celui-là, il est possible voir la progression des taux totales (somme de tous le pays) des 3 causes à partire de 1990 jusqu'à 2017. 

Pour terminer nous avons ajouté un graphique crée avec la librerie **billboard.js** qui montre ensemble les 3 taux de mortalité pour chaque années. On peut également cliquer sur une légendes pour se concentrer sur un des taux de mortalité (tabac, alcool, drogues).

## **Comment elles ont été transformées**

Les données ont été téléchargés depuis le site en format .csv, ouvert en excel pour les analyser. Pour réussir à créer les maps du monde avec leaflet nous avions besoin de données sous forme GeoJson, qui integrent donc aussi les coordonnées des pays, en plus que la valeur des taux. Nous avons donc pris la base avec les coordonnées des pays du monde depuis https://github.com/johan/world.geo.json/blob/master/countries.geo.json et nous avons ajouté manuelment les valeurs des taux à défaut de trouver un second script pour mettre la valeur de chacun des taux dedans.

Pour les autres graphiques, nous avons dû créer des tables pivots sur excel pour regrouper les données que nous avons eu besoin pour créer finalement des csv et des json avec des scripts de préparation pour les utiliser.

## Code source de la  visualisation

https://github.com/AudilaraZ/VisualDon/tree/master/mon-projet

## Lien vers la visualisation publiée

http://causesmortalite.surge.sh

## **Pour recréer le site à partir de votre code**

- Installer [node.js](https://nodejs.org/en/download/)

- Installer parcel avec les commandes:

  `npm install parcel-bundler --save-dev` 
   `npm init -y`

- Crée un nouveau dossier "projet" en local où vous voulez placer le code et y entrer avec votre terminal. 

- Cloner le code du projet depuis le terminal:
   `git clone git@github.com:AudilaraZ/VisualDon/mon-projet.git`

- Installer les librairies requises attravers de ces commandes au terminal:

  `npm leaflet`

  `npm install d3`

  `npm install billboard.js`

- Ajouter cette ligne dans les scrupts du fichier package.json:
  `dev: "parcel projet/src/index.html`

- lancer la commande: `npm run dev`