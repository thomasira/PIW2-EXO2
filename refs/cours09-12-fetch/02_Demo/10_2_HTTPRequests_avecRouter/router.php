<?php
require_once "inc/bootstrap.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Récupérez l'URL actuelle
// Récupérez le chemin de l'URL
// Divisez l'URL en segments en utilisant '/' comme délimiteur
// Supprimez le premier segment (qui est api)

$currentUrl = $_SERVER['REQUEST_URI'];
$parsedUri = parse_url($currentUrl);
$path = $parsedUri['path'];
$urlSegments = explode('/', trim($path, '/'));
array_shift($urlSegments);

// Le premier segment est le nom du contrôleur
$controllerName = array_shift($urlSegments);

// Le reste des segments sont les paramètres de l'action
$actionParams = $urlSegments;

// Déterminez le nom du fichier de contrôleur en fonction du nom du contrôleur
$controllerFileName = 'Controller/Api/' . ucfirst($controllerName) . 'Controller' . '.php';


// Vérifiez si le fichier du contrôleur existe
if (file_exists($controllerFileName)) {
    // Incluez le fichier du contrôleur
    require_once($controllerFileName);

    // Construisez le nom de la classe du contrôleur
    $controllerClassName = ucfirst($controllerName) . 'Controller';

    // Vérifiez si la classe du contrôleur existe
    if (class_exists($controllerClassName)) {

        // Créez une instance du contrôleur
        // Vérifiez si la méthode d'action (par exemple, index, show, edit, etc.) existe
        // Vérifiez le type de requête HTTP (GET, POST, etc.)
        // Formatez le nom de la méthode d'action en fonction de la requête HTTP. Ex. putModifier, postNouveau, getTous, etc.
        $controller = new $controllerClassName();
        $action = isset($actionParams[0]) ? $actionParams[0] : 'index';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $actionMethodName = strtolower($requestMethod) . ucfirst($action);

        if (method_exists($controller, $actionMethodName)) {
            // Appelez la méthode d'action appropriée avec les paramètres restants
            call_user_func_array([$controller, $actionMethodName], array_slice($actionParams, 1));
        } else {
            // Méthode d'action non trouvée, vous pouvez gérer cela comme vous le souhaitez
            echo "Méthode d'action non trouvée.";
        }
    } else {
        // Classe du contrôleur non trouvée, vous pouvez gérer cela comme vous le souhaitez
        echo "Classe du contrôleur non trouvée.";
    }
} else {
    // Fichier du contrôleur non trouvé, vous pouvez gérer cela comme vous le souhaitez
    echo "Fichier du contrôleur non trouvé.";
}

exit();