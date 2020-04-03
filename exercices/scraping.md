# Technique de scraping

Audrey Zeugin

------

## Comment télécharger le jeux de données des chaussettes vendues sur Galaxus?

1. Aller sur le site de Galaxus
2. Ouvrire l'inspecteur et aller sous l'onglet network
3. Taper le mot chaussettes dans la bare de recherche, cela va ouvrir une nouvelle page et des informations vont apparaître dans le network
4. Cliquer sur un article, faire un clique droit et choisire copy > puis copy as cURL. Ainsi on obtient une requête GraphQL.
5. L'URL de type cURL de GraphQL est toujours construite de la même manière.
   1. Au début on a toujours ceci:  'https://www.galaxus.ch/api/graphql'
   2. En faisant une requête pour voir les datas (--data) on obtient des données intéressantes
   3. On peut aussi après cette requête sauver ces données dans un fichier .json. Pour cela on reprend l'URL cURL et on met à la fin > chaussettes.json
6. Ensuite, on peut préparer les données.
   1. On crée un script qu'on peut appeler prepare.js où l'on va charger le ficher chaussettes.json et rama. On utilise ausse path de ramda pour touver ce que nous cherchons. 
   2. Parfois en faisant des requêtes on tombe sur beaucoup d'information,mias avec GraphQl cela nous permet de les trier à notre guise.
   3. Quand nous sommes satisfaits, on sauve le résultat en faisant un fichier data.json.

## Comment télécharger le jeux de données des titres du 19h30 de la RTS?

1. Comme pour l'exemple précédent, il faut se rendre sur la page du journal du jour de la RTS, ouvrir l'inspecteur et aller sous l'onglet network
   1. On ouvre l'URL menant aux épisodes du 19h30, des informations vont apparaître dans le network. Il faut trouver dans les fichiers le dernier épisodes puis on ouvre l'URL et on trouve des informations spécifiques aux épisodes
   2. On peut aussi classer les épisodes par date oour obtenir els 10 dernier épisodes
2. Ensuite on veut télécharger les données
   1. Pour cela on va utiliser la librairie "dayjs", on l'instsall avec une commande
   2. On crée la fonction pour trouver la prochaine date avec "maxDate" et on fait une requête
   3. On télécharge en suite les données avec "code-fetch" 
   4. Avec un fonction "maxDate" on va encore faire une requête avec l'URL pour que les réponses soient lues en format json.
3. On sauve les données dans un fichier ndjson. Le fichier ndjson est un fichier où chaque ligne sera lu comme un objet json. Pour rajouter une ligne (donc un objet de plus) on utilise la fonction creatWriteStream. On sauve toutes ces données dans un fichier que l'on nomme scraped.ndjson
4. Vu qu'un fichier ndjson est unfichier où chaque ligne sera lu comme un objet json, si nous avons de nouvelle date, il faut qu'elle soient incrémenter, donc il faut faire une boucle. 
   1. On peut utiliser la fonction loop. 
   2. On oublie pas non plus de signaler la fin de la boucle en indiquan tune date butoir.
5. Vu qu'en fin de compte cela fait vraiment beaucoup d'épisode et qu'on se retrouve avec dix épisodes par ligne, on veut modifier tout ça en splitant le tout et en faisant en sorte que uen ligne corresponde à un seul épisode. Alors, pour lire lre fichier ligne par ligne on va utiliser la librairie readline et utiuliser la fonction reader.on
6. Finalement on trie les inforamtions en gardant seulement les parties qui nous intéressent et que l'on sauvegarde dans des fichiers séparer.
7. Une fois qu'on est statisfait on lie ce que l'on veut grâce à l'id des épisodes pour former un fichier final qu'on nommera segments.ndjson