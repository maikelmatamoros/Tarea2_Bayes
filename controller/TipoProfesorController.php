<?php
class TipoProfesorController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function tipoProfesor() {
        $this->view->show("tipoProfesorView.php");//se llama a la vista  
    }   

    public function obtenerFrecuenciaProfesor(){
        require 'model/ProfesorModel.php';
        $helper = new ProfesorModel();
        $datosProfesor=$helper->obtenerFrecuenciasProfesor();
        header('Content-Type: application/json');
        echo json_encode($datosProfesor);//convierte el objeto en json
    }   

    public function obtenerProbabilidaesAtributoProfesor(){
        require 'model/ProfesorModel.php';
        $helper = new ProfesorModel();
        $datosProfesor=$helper->obtenerProbabilidaesAtributoProfesor();
        header('Content-Type: application/json');
        echo json_encode($datosProfesor);//convierte el objeto en json
    }  

    public function obtenerProbabilidaesClaseProfesor(){
        require 'model/ProfesorModel.php';
        $helper = new ProfesorModel();
        $datosProfesor=$helper->obtenerProbabilidaesClaseProfesor();
        header('Content-Type: application/json');
        echo json_encode($datosProfesor);//convierte el objeto en json
    }  

    public function generarProbabilidaesAtributoProfesor(){
        require 'model/ProfesorModel.php';
        $helper = new ProfesorModel();
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        if ($contentType === "application/json") {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);
            $helper->generarProbabilidaesAtributoProfesor($decoded); 
        }
    }
}
?>
