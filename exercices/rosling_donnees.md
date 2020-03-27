# Préparer les données

Audrey Zeugin

------

## 1. Expliquez la procédure en quelques points

1. Télécharger les données
2. Convertir les xlsx en csv
   1. Installer une librairie xlsx
   2. Créer un scripte
   3. Passer le nom du fichier et la "feuille" au scripte
   4. Utiliser le même scripte pour les 4 fichiers
3. Joindre les données entre elles en faisant une conversion csv en json
   1. Trois scriptes différents à faire
4. Joindre les jeux de données
5. Définir une clé avec les corchet carré []
6. Créer un script bash (refait toute la procédure)

## 2. Quel est l'interet d'avoir des scriptes pour manipuler des données?

Avec les scripts cela nous évite de faire des manipulations manuelles auxquelles on ne se souvient pas trop de ce que nous faisons. et si on met à jour les données, on doit répeter la même manipulation. Pour répéter cette procédure plus simplement en cas de mise à jour on peut utiliser donc les scriptes

## 3. Comment avons nous joint les quatre jeux de données?

Nous avons utilisé la colonne geo pour joindre les données entre elles