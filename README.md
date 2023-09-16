
# PIW2 - EXO2

Thomas Aucoin-Lo  
e2395387

## Sur le gestionnaire de sondage

Le gestionnaire de sondage gère l'entiereté du projet. Il communique les requêtes au serveur et mets à jour sa liste d'item pour enfin les afficher dans le HTML.

> bien que le projet pourrait sauter plusieurs étapes afin d'afficher un résultat similaire(voir ***this.#sondages*** et ***this.mettreAJourLesSondagesHTML()***), la passerelle créée par ce tableau permet de manipuler les données sans avoir à rejoindre la DB(voir ***this.calculerTotal()*** par exemple). Cela requiert parcontre d'attendre la recéption des données avant de manipuler ce tableau. Dans ce cas, un Événement est créé et émit pour communiquer la complétion de l'opération. 