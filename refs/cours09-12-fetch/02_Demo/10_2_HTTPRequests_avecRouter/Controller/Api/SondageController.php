<?php

class SondageController
{

    /**
     * @method GET
     * "/sondage/tous" Endpoint - Récupère tous les sondages
     * */

    public function getTous()
    {

        $sondageModel = new SondageModel();

        $listeSondages = $sondageModel->getSondages();
        header('Content-Type: application/json');

        echo json_encode($listeSondages);
    }

    public function getUn($id)
    {
        $sondageModel = new SondageModel();

        $listeSondages = $sondageModel->getSondageParId($id);
        header('Content-Type: application/json');

        echo json_encode($listeSondages);
    }

    /**
     * @method POST
     * "/sondage/nouveau" Endpoint - Ajouter un nouveau sondage
     * */

    public function postNouveau()
    {
        $sondageModel = new SondageModel();

        $insert = $sondageModel->ajouterSondage($_POST['niveau']);

        header('Content-Type: application/json');
        echo json_encode($insert);
        exit();
    }

    /**
     * @method PUT 
     * "/sondage/" Endpoint - Modifie un sondage
     */

    public function putModifier()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $sondageModel = new SondageModel();

        $insert = $sondageModel->modifierSondage($data['id'], $data['niveau']);

        header('Content-Type: application/json');
        echo json_encode($insert);
        exit();
    }


}