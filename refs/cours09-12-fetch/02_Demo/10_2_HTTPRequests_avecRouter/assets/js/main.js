(function () {
    const sondageListe = document.querySelector("[data-sondages]");
    const moyenne = document.querySelector("[data-sondages-moyenne]");
    const form = document.querySelector("[data-sondages-form]");

    function init() {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            new Promise((resolve, reject) => {
                const data = new FormData(form);

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/api/sondage/nouveau/");

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                };
                xhr.send(data);

                form.reset();
            }).then(() => {
                sondageListe.innerHTML = "";
                afficher();
            });
        });

        afficher();
    }

    function afficher() {
        new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/sondage/tous", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();
        }).then((data) => {
            let moyenneSondage = 0;

            data.forEach((sondage) => {
                const html = `<input type="number" min="1" max="5" class="list-group-item" value="${sondage.niveau}">`;
                sondageListe.insertAdjacentHTML("beforeend", html);

                const element = sondageListe.lastElementChild;
                element.addEventListener("change", (e) => {
                    const niveau = e.currentTarget.value;
                    const id = sondage.id;

                    modifier(id, niveau);
                });

                moyenneSondage += +sondage.niveau;
            });

            moyenneSondage = moyenneSondage / data.length;
            moyenne.innerHTML = moyenneSondage;
        });
    }

    function modifier(id, niveau) {
        const data = { id, niveau };

        new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open("PUT", "/api/sondage/modifier", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.responseText);
                }
            };

            xhr.send(JSON.stringify(data));
        }).then((data) => {
            // console.log(data);
        });
    }

    init();
})();
