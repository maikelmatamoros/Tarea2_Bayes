<?php
class DeterminarEstiloModel{
    public $db;   

    // constructor
    public function __construct() {
        require 'libs/SPDO.php';
        $this->db = SPDO::singleton();
    }

    
    public function obtenerFrecuenciasDeterminarEstilo(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select atributo, valor, clase, frecuencia from frecuenciasEstilo');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    /**
     * It returns the probability of each attribute value for each class
     */
    public function obtenerProbabilidaesAtributoDeterminarEstilo(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select atributo, valor, clase, probabilidad from probabilidadatributosDeterminarEstilo');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    /**
     * It returns the probability of each class in the database.
     */
    public function obtenerProbabilidaesClaseDeterminarEstilo(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select clase, probabilidad from probclaseestilo');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    /**
     * It takes an array of arrays, and inserts each array into a table.
     * 
     * @param data array of arrays
     */
    public function generarProbabilidaesAtributoDeterminarEstilo($data) {
        $this->db->exec("set names utf8");
        $probabilidad=array();
        $longitud = count($data);
        $consulta = $this->db->prepare("INSERT INTO probabilidadatributosDeterminarEstilo(atributo, valor, clase, probabilidad) VALUES (?,?,?,?)");
        for($i=0; $i<$longitud; $i++){ 
            $d = array($data[$i]["atributo"], $data[$i]["valor"], $data[$i]["clase"], 
                $data[$i]["probabilidad"]);
            $result = $consulta->execute($d);
        } 
        $consulta->CloseCursor();     
    }
}

?>