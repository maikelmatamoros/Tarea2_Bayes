<?php

class EstiloAprendizajeController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function estiloAprendizaje() {        
        $this->view->show("estiloAprendizajeView.php");     
    } 

    public function obtenerFrecuenciaAdivinarAprendizaje(){
        require 'model/AdivinarAprendizajeModel.php';
        $helper = new AdivinarAprendizajeModel();
        $datosAdivinarAprendizaje=$helper->obtenerFrecuenciasAdivinarAprendizaje();
        header('Content-Type: application/json');
        echo json_encode($datosAdivinarAprendizaje);//convierte el objeto en json
    }   

    public function obtenerProbabilidaesAtributoAdivinarAprendizaje(){
        require 'model/AdivinarAprendizajeModel.php';
        $helper = new AdivinarAprendizajeModel();
        $datosAdivinarAprendizaje=$helper->obtenerProbabilidaesAtributoAdivinarAprendizaje();
        header('Content-Type: application/json');
        echo json_encode($datosAdivinarAprendizaje);//convierte el objeto en json
    }  

    public function obtenerProbabilidaesClaseAdivinarAprendizaje(){
        require 'model/AdivinarAprendizajeModel.php';
        $helper = new AdivinarAprendizajeModel();
        $datosAdivinarAprendizaje=$helper->obtenerProbabilidaesClaseAdivinarAprendizaje();
        header('Content-Type: application/json');
        echo json_encode($datosAdivinarAprendizaje);//convierte el objeto en json
    }  

    public function generarProbabilidaesAtributoAdivinarAprendizaje(){
        require 'model/AdivinarAprendizajeModel.php';
        $helper = new AdivinarAprendizajeModel();
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        if ($contentType === "application/json") {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);
            $helper->generarProbabilidaesAtributoAdivinarAprendizaje($decoded); 
        }
    }
    
    
}
?>
