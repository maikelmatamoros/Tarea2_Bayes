<?php
class AdivinarAprendizajeModel{
    public $db;   

    // constructor
    public function __construct() {
        require 'libs/SPDO.php';
        $this->db = SPDO::singleton();
    }

    /**
     * It returns the frequency of each attribute value for each class.
     */
    public function obtenerFrecuenciasAdivinarAprendizaje(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select atributo, valor, clase, frecuencia from frecuenciasestiloaprendizaje');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    /**
     * It returns the result of a query that selects the columns atributo, valor, clase, and
     * probabilidad from the table probabilidadatributosAdivinarAprendizaje
     */
    public function obtenerProbabilidaesAtributoAdivinarAprendizaje(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select atributo, valor, clase, probabilidad from probabilidadatributosAdivinarAprendizaje');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    /**
     * It returns the probability of each class in the database.
     */
    public function obtenerProbabilidaesClaseAdivinarAprendizaje(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select clase, probabilidad from probClaseEstiloAprendizaje');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    /**
     * It takes an array of arrays, and inserts each array into a database table
     * 
     * @param data array of arrays
     */
    public function generarProbabilidaesAtributoAdivinarAprendizaje($data) {
        $this->db->exec("set names utf8");
        $probabilidad=array();
        $longitud = count($data);
        $consulta = $this->db->prepare("INSERT INTO probabilidadAtributosAdivinarAprendizaje(atributo, valor, clase, probabilidad) VALUES (?,?,?,?)");
        for($i=0; $i<$longitud; $i++){ 
            $d = array($data[$i]["atributo"], $data[$i]["valor"], $data[$i]["clase"], 
                $data[$i]["probabilidad"]);
            $result = $consulta->execute($d);
        } 
        $consulta->CloseCursor();     
    }
}

?>