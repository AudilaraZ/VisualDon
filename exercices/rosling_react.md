# Différence entre d3.select et react

Audrey Zeugin

------

## 1. Comment les bulles sont-elles créées dans cette version?

1. Changer les extensio. du fichier index.js en index.jsx
2. Signaler le changment dans le HTML
3. Créer les bulles
   1. créer un composant qui va générer une bulle --> const Bubble
   2. Nous avons déjà deux clés: data et yearIndex.data (comme avec d3)
   3. Avec JSX, on va faire des attributs dynamiques en entourant le résultat avec les accolades {}
   4. Utilisation de la méthode .map() pour les bubbles qui vont retourner chaque bulle avec pour attributs dat et yearIndex.
   5. Deplus un clé/ key va être utiliser, pour des raisons de performance. Avec key on va prendre un identifiant unique: on prend l'identifiant pays geo



## 2. Comment les données sont elles jointes aux éléments DOM avec `react`?

Avec des composants réactionnaires, il nous est recommandé d'ajouter key pour des raisons de performances. Si on ne le fait pas on risque d'avoir des erreures dans la console.