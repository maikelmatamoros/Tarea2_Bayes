<?php
class RedesModel{
    public $db;   

    // constructor
    public function __construct() {
        require 'libs/SPDO.php';
        $this->db = SPDO::singleton();
    }

    public function obtenerFrecuenciasRedes(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select atributo, valor, clase, frecuencia from frecuenciasredes');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    public function obtenerProbabilidaesAtributoRedes(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select atributo, valor, clase, probabilidad from probabilidadatributosredes');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    public function obtenerProbabilidaesClaseRedes(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select clase, probabilidad from probclaseredes');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    public function generarProbabilidaesAtributoRedes($data) {
        $this->db->exec("set names utf8");
        $probabilidad=array();
        $longitud = count($data);
        $consulta = $this->db->prepare("INSERT INTO probabilidadatributosredes(atributo, valor, clase, probabilidad) VALUES (?,?,?,?)");
        for($i=0; $i<$longitud; $i++){ 
            $d = array($data[$i]["atributo"], $data[$i]["valor"], $data[$i]["clase"], 
                $data[$i]["probabilidad"]);
            $result = $consulta->execute($d);
        } 
        $consulta->CloseCursor();     
    }
}

?>