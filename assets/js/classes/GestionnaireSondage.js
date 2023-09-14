export default class GestionnaireSondage {
    #sondageListe;
    #sondages;
    #form;

    constructor() {
        this.#sondageListe = document.querySelector('[data-sondages]');
        this.#form = document.querySelector('[data-sondages-form]');
        this.#sondages = [];
        this.init();
    }

    /**
     * Initialisation de l'application
     */
    init() {
        const delay = new Promise(resolve => {
            this.getSondages().then(); resolve();
           /*  setTimeout(()=> {resolve()}, 4000) */
        }).then(() => console.log(this.#sondages));

/*         function operationAsynchrone(delay) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    console.log("Opération asynchrone terminée");
                    resolve();
                }, delay);
            });
        }
        console.log("Début");
        operationAsynchrone(1000)
        .then(function() {
           return operationAsynchrone(1000);
        })
        .then(function() {
            return operationAsynchrone(1000);
        })
        .then(function() { console.log("Fin") }); */
        
        //Lors de l'envoi du formulaire, on bloque le comportement par défaut et on ajoute le sondage
        this.#form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.ajouterSondage({ niveau: this.#form.niveau.value });
        });
    }

    /**
     * Mets à jour la liste des sondages dans le HTML
     * Vide préalablement la liste
     */
    mettreAJourLesSondagesHTML() {
        this.#sondageListe.innerHTML = '';
        this.#sondages.forEach(sondage => {
            /* console.log(sondage) */
            this.injecterSondageHTML(sondage, index)})
    }

    /**
     * Injecte un nouveau sondage à la fin de la liste des sondages
     */
    injecterSondageHTML(sondage, index) {
        /* console.log(sondage) */
        const html = `
        <div class="item" data-id="${sondage.id}">ID Vote ${sondage.id} | Choix :${sondage.niveau}<i data-btn-supprimer class="fa fa-trash"></i></div>
        `;
        this.#sondageListe.insertAdjacentHTML('beforeend', html);

        const elementAjoute = this.#sondageListe.lastElementChild;

        const boutonSupprimer = elementAjoute.querySelector("[data-btn-supprimer]");
        boutonSupprimer.addEventListener('click', () => {
            this.supprimerSondage(sondage.id, elementAjoute);
        });
    }

    /**
     * Récupère les sondages depuis le serveur avec une requête HTTP GET (via FETCH)
     */
    getSondages() {
        fetch('api/sondages/rechercher.php').
        then(response => { 
            if(response.ok) return response.json();
            else throw new Error('La réponse n\'est pas valide'); 
        }).
        then(dataF => {dataF.forEach(element => this.#sondages.push(element)); return true;} ).
        catch(error => console.error('Échec: ', error));
    }

    /**
     * Ajoute un nouveau sondage au serveur avec une requête HTTP POST (via FETCH)
     */
    ajouterSondage(sondage) {
        fetch('api/sondages/creer.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sondage)
        }).
        then(dataIn => { return dataIn.json() }).
        then(dataF => this.#sondages.push(dataF));
    }

    /**
     * Supprime un sondage du serveur avec une requête HTTP DELETE (via FETCH)
     * Trouve et supprime l'élément dans la liste des sondages et mets la liste à jour avec la méthode mettreAJourLesSondagesHTML()
     */
    supprimerSondage(id, elementHTML) {
        fetch('api/sondages/supprimer.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'id': id})
            }).
        then(dataIn => { return dataIn.json() }).
        then(() => { elementHTML.remove() });
    }
}
