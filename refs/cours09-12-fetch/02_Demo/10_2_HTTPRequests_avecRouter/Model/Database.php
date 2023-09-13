<?php

class Database
{

    protected $connection = null;

    public function __construct()
    {

        try {

            $this->connection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);



            if (mysqli_connect_errno()) {

                throw new Exception("Impossible de se connecter à la DB");

            }

        } catch (Exception $e) {

            throw new Exception($e->getMessage());

        }

    }


    public function executeStatement($query = "", $params = [])
    {

        try {

            $stmt = $this->connection->prepare($query);

            if ($stmt === false) {

                throw new Exception("Impossible de préparer la requête" . $query);

            }

            if ($params) {

                $stmt->bind_param($params[0], $params[1]);

            }

            if ($stmt->execute()) {
                $data = $stmt->get_result();

                $stmt->close();
                $this->disconnect();

                return $data;
            } else {
                die("Query execution failed: " . $stmt->error);
            }

        } catch (Exception $e) {

            throw new Exception($e->getMessage());

        }

    }

    public function disconnect()
    {
        if ($this->connection) {
            $this->connection->close();
        }
    }


}