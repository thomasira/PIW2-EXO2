<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="assets/img/favicon.ico" type="image/x-icon">
    <!-- Lien pour intégrer font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="assets/css/styles.css">

    <!-- Script principal -->
    <script type="module" src="assets/js/test.js"></script>
    <title>Exercice 9 - Formulaire de satisfaction</title>
</head>

<body>
    <nav>
        <div class="logo">
            <!-- icone generee par font-awesome -->
            <i class="fa fa-smile"></i>
            Sondages Lacasse
        </div>
    </nav>

    <main data-livraison-app>
        <h1>Exercice 9 - Requêtes HTTP</h1>
        <h2>Formulaire de satisfaction</h2>

        <form data-sondages-form>
            <label for="niveau-1">Passable</label>
            <input type="radio" name="niveau" id="niveau-1" value="1">

            <label for="niveau-2">Moyen</label>
            <input type="radio" name="niveau" id="niveau-2" value="2">

            <label for="niveau-3">Bon</label>
            <input type="radio" name="niveau" id="niveau-3" value="3" checked>

            <label for="niveau-4">Très bon</label>
            <input type="radio" name="niveau" id="niveau-4" value="4">

            <label for="niveau-5">Excellent</label>
            <input type="radio" name="niveau" id="niveau-5" value="5">

            <button type="submit">Envoyer</button>
        </form>

        <ul data-sondages class="mb-3">

        </ul>
        <div>Moyenne: <span data-sondages-moyenne></span></div>
    </main>
</body>

</html>