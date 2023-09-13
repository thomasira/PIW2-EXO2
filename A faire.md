# Exercice 2 - cours 10 - Introduction requêtes Fetch asynchrones

## Consignes

1. Connectez-vous à une base de données MySQL avec PHP et importez la bdd sondage.sql dans le dossier data. Attention, vérifier que les informations de connexion à la base de données sont correctes dans chacun des fichiers PHP.

2. Au chargement de la page indexHTML, récupérez les données de la table sondage avec une requête HTTP GET entourée d'une promesse et affichez-les dans le DOM.

3. Au clic sur le bouton "Voter", envoyez les données du formulaire avec une requête HTTP POST entourée d'une promesse et affichez le résultat dans le DOM.

4. Au clic du bouton supprimer, envoyez les données du formulaire avec une requête HTTP DELETE entourée d'une promesse et retirer l'élément de la liste du gestionnaire. Mettez ensuite à jour la page.

## Notes

Vous pouvez vous inspirer de la solution de l'exercice du cours précédent pour la logique de programmation. Attention, les fonctions n'ont peut-être pas le même nom. Vous devez utiliser l'api Fetch pour réaliser vos requêtes.

L'exercice compte pour 5% de la note finale.