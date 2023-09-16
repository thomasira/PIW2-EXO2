export default class GestionnaireSondage {
    #sondageListe;
    #sondages;
    #form;
    #total;

    constructor() {
        this.#sondageListe = document.querySelector('[data-sondages]');
        this.#form = document.querySelector('[data-sondages-form]');
        this.#total = document.querySelector('[data-js-total]')
        this.#sondages = [];

        this.init();
    }

    /**
     * Initialisation de l'application
     * écouter pour un événement 'readySondage' avant de mettre à jour le HTML
     */
    init() {

        this.getSondages();
        //Lors de l'envoi du formulaire, on bloque le comportement par défaut et on ajoute le sondage
        this.#form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.ajouterSondage({ niveau: this.#form.niveau.value });
        });
        document.addEventListener('readySondage', () => this.mettreAJourLesSondagesHTML());
    }

    /**
     * Mettre à jour la liste des sondages dans le HTML et appeler le calcul du total
     * Vide préalablement la liste
     */
    mettreAJourLesSondagesHTML() {
        this.#sondageListe.innerHTML = '';
        this.#sondages.forEach(sondage => this.injecterSondageHTML(sondage));
        this.calculerTotal();
    }

    /**
     * Injecter un nouveau sondage à la fin de la liste des sondages
     * initialiser le bouton supprimer de chaque sondage affiché
     */
    injecterSondageHTML(sondage) {
        const html = `
            <div class="item" data-id="${sondage.id}">ID Vote ${sondage.id} | Choix :${sondage.niveau}<i data-btn-supprimer class="fa fa-trash"></i></div>
        `;
        this.#sondageListe.insertAdjacentHTML('beforeend', html);

        const elementAjoute = this.#sondageListe.lastElementChild;

        const boutonSupprimer = elementAjoute.querySelector("[data-btn-supprimer]");
        boutonSupprimer.addEventListener('click', () => this.supprimerSondage(sondage.id, elementAjoute));
    }

    /**
     * Récupèrer les sondages depuis le serveur avec une requête HTTP GET (via FETCH) et les ajouter à this.#sondages
     * envoyer un événement au document une fois le remplissage du tableau completé
     */
    getSondages() {
        fetch('api/sondages/rechercher.php').
        then(response => { 
            if(response.ok) return response.json();
            else throw new Error('La réponse n\'est pas valide'); 
        }).
        then(dataF => {
            dataF.forEach(element => this.#sondages.push(element));
            const event = new Event('readySondage');
            document.dispatchEvent(event);
        }).
        catch(error => console.error('Échec: ', error));
    }

    /**
     * Ajouter un nouveau sondage au serveur avec une requête HTTP POST (via FETCH) et l'ajouter à this.#sondages
     * envoyer un événement au document une fois le remplissage du tableau completé
     */
    ajouterSondage(sondage) {
        fetch('api/sondages/creer.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sondage)
        }).
        then(dataIn => { return dataIn.json() }).
        then(dataF => {
            this.#sondages.push({ niveau: dataF.niveau, id: dataF.id });
            const event = new Event('readySondage');
            document.dispatchEvent(event);
        });
    }

    /**
     * Supprimer un sondage du serveur avec une requête HTTP DELETE (via FETCH)
     * Trouver et supprimer l'élément dans la liste des sondages et mets la liste à jour avec la méthode mettreAJourLesSondagesHTML()
     */
    supprimerSondage(id) {
        fetch('api/sondages/supprimer.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'id': id})
            }).
        then(dataIn => { return dataIn.json() }).
        then(() => {
            this.#sondages.forEach((element, index) => {
                if(element.id == id) this.#sondages.splice(index, 1);
                this.mettreAJourLesSondagesHTML();
            });
        });
    }

    /**
     * calculer et afficher le total des votes du tableau this.#sondages
     */
    calculerTotal() {
        this.#total.innerHTML = '';
        let passable = 0,
            moyen = 0,
            bon = 0,
            tresBon = 0,
            excellent = 0;
        this.#sondages.forEach(sondage => {
            switch(sondage.niveau) {
                case '1':
                    passable ++;
                    break;
                case '2':
                    moyen ++;
                    break;
                case '3':
                    bon ++;
                    break;
                case '4':
                    tresBon ++;
                    break;
                case '5':
                    excellent ++;
                    break;
            }
        });
        const HTML = `
            <li>Excellent: <strong>${excellent}</strong></li>
            <li>Très Bon: <strong>${tresBon}</strong></li>
            <li>bon: <strong>${bon}</strong></li>
            <li>moyen: <strong>${moyen}</strong></li>
            <li>passable: <strong>${passable}</strong></li>
        `;
        this.#total.insertAdjacentHTML('beforeend', HTML);
    }
}
