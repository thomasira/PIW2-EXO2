# Démo cours 9 - Introduction requêtes HTTP asynchrones

## Contenu à maîtriser à la fin du cours

1. Pouvoir utiliser les requêtes HTTP asynchrones dans une application web avec XMLHttpRequest
2. Pouvoir récuperer les données d'une requête HTTP
3. Modifier le DOM avec les données d'une requête HTTP

## Étapes

1. Connectez-vous à une base de données MySQL avec PHP et importez la bdd sondage.sql dans le dossier data.
2. Au chargement de la page indexHTML, récupérez les données de la table sondage avec une requête HTTP GET entourée d'une promesse et affichez-les dans le DOM.
3. Au clic sur le bouton "Voter", envoyez les données du formulaire avec une requête HTTP POST entourée d'une promesse et affichez le résultat dans le DOM.
4. Au clic du bouton supprimer, envoyez les données du formulaire avec une requête HTTP DELETE entourée d'une promesse et retirer l'élément du DOM avec remove().
