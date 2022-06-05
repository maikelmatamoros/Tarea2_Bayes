<?php
class RecintoOrigenController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function recintoOrigen() {
        $this->view->show("recintoOrigenView.php");//se llama a la vista
    }   

    public function obtenerFrecuenciaRecinto(){
        require 'model/RecintoModel.php';
        $helper = new RecintoModel();
        $datosRecinto=$helper->obtenerFrecuenciasRecinto();
        header('Content-Type: application/json');
        echo json_encode($datosRecinto);//convierte el objeto en json
    }   

    public function obtenerProbabilidaesAtributoRecinto(){
        require 'model/RecintoModel.php';
        $helper = new RecintoModel();
        $datosRecinto=$helper->obtenerProbabilidaesAtributoRecinto();
        header('Content-Type: application/json');
        echo json_encode($datosRecinto);//convierte el objeto en json
    }  

    public function obtenerProbabilidaesClaseRecinto(){
        require 'model/RecintoModel.php';
        $helper = new RecintoModel();
        $datosRecinto=$helper->obtenerProbabilidaesClaseRecinto();
        header('Content-Type: application/json');
        echo json_encode($datosRecinto);//convierte el objeto en json
    }  

    public function generarProbabilidaesAtributoRecinto(){
        require 'model/RecintoModel.php';
        $helper = new RecintoModel();
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        if ($contentType === "application/json") {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);
            $helper->generarProbabilidaesAtributoRecinto($decoded); 
        }
    }
}
?>
