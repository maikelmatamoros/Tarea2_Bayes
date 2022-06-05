<?php
class RecintoModel{
    public $db;   

    // constructor
    public function __construct() {
        require 'libs/SPDO.php';
        $this->db = SPDO::singleton();
    }

    public function obtenerFrecuenciasRecinto(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select atributo, valor, clase, frecuencia from frecuenciasRecinto');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    public function obtenerProbabilidaesAtributoRecinto(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select atributo, valor, clase, probabilidad from probabilidadatributosRecinto');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    public function obtenerProbabilidaesClaseRecinto(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select clase, probabilidad from probclaseRecinto');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    public function generarProbabilidaesAtributoRecinto($data) {
        $this->db->exec("set names utf8");
        $probabilidad=array();
        $longitud = count($data);
        $consulta = $this->db->prepare("INSERT INTO probabilidadatributosRecinto(atributo, valor, clase, probabilidad) VALUES (?,?,?,?)");
        for($i=0; $i<$longitud; $i++){ 
            $d = array($data[$i]["atributo"], $data[$i]["valor"], $data[$i]["clase"], 
                $data[$i]["probabilidad"]);
            $result = $consulta->execute($d);
        } 
        $consulta->CloseCursor();     
    }
}

?>