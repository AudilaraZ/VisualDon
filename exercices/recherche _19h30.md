# Recherche 19h30

Audrey Zeugin

------

## Mon script (les 10 premiers titres des épisodes le plus vus)

```
ndjson-sort "a.views > b.views ? -1 : 1" < episodes.ndjson \
| head -10 \
| ndjson-map "{ firstTitle: d.segments[0].title, date: d.date, vues: d.views}" \
| ndjson-reduce
```

## Le résultat

[{"firstTitle":"Succession de Hans-Rudolf Merz: entretien avec Johann Schneider-Ammann, candidat PLR","date":"2010-09-03","vues":273846},{"firstTitle":"Attentat à Charlie Hebdo: la traque des suspects se poursuit au nord-est de Paris (1/2)","date":"2015-01-08","vues":212862},{"firstTitle":"Double attentat en Norvège: Andres Breivik prévoyait d'autres attaques","date":"2011-07-30","vues":158392},{"firstTitle":"Un Suisse sur dix est obèse et quatre Suisses sur dix ont des kilos en trop","date":"2013-10-10","vues":109196},{"firstTitle":"Le conseil fédéral annonce qu'il interdit les rassemblements de plus de 5 personnes","date":"2020-03-20","vues":106009},{"firstTitle":"Le conseil fédéral annonce qu'il interdit les rassemblements de plus de 5 personnes","date":"2020-03-20","vues":106008},{"firstTitle":"Coronavirus: l'OFSP lance une campagne de prévention.","date":"2020-02-27","vues":95983},{"firstTitle":"Selon les autorités fédérales, il est temps de réagir fortement pour éviter une surcharge des hôpitaux.","date":"2020-03-17","vues":94302},{"firstTitle":"Le Conseil fédéral ferme toutes les écoles et interdit les rassemblements de plus de 100 personnes.","date":"2020-03-13","vues":92939},{"firstTitle":"Le trafic aérien est interrompu entre l'Europe et les États-Unis.","date":"2020-03-12","vues":90513}]

audreyzeugin:19h30 audreyzeugin$ 