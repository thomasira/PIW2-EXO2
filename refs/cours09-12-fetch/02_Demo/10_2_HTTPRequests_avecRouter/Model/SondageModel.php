<?php

require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class SondageModel extends Database
{

    public function getSondages()
    {

        return $this->executeStatement("SELECT * FROM sondages ORDER BY id ASC")->fetch_all(MYSQLI_ASSOC);
    }
    public function getSondageParId($id)
    {

        return $this->executeStatement("SELECT * FROM sondages WHERE id = '$id' ORDER BY id ASC")->fetch_assoc();
    }

    public function ajouterSondage($niveau)
    {

        //Ajouter un sondage avec les données passées en paramètre
        return $this->executeStatement("INSERT INTO sondages (niveau) VALUES ('$niveau')");
    }

    public function modifierSondage($id, $nouveauNiveau)
    {

        //Ajouter un sondage avec les données passées en paramètre
        return $this->executeStatement("UPDATE sondages SET niveau = '$nouveauNiveau' WHERE id = '$id'");
    }

}