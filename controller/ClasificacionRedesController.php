<?php
class ClasificacionRedesController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function clasificacionRedes() {
        $this->view->show("clasificacionRedesView.php");//se llama a la vista
            
    }

    public function obtenerFrecuenciaRedes(){
        require 'model/RedesModel.php';
        $helper = new RedesModel();
        $datosRedes=$helper->obtenerFrecuenciasRedes();
        header('Content-Type: application/json');
        echo json_encode($datosRedes);//convierte el objeto en json
    }   

    public function obtenerProbabilidaesAtributoRedes(){
        require 'model/RedesModel.php';
        $helper = new RedesModel();
        $datosRedes=$helper->obtenerProbabilidaesAtributoRedes();
        header('Content-Type: application/json');
        echo json_encode($datosRedes);//convierte el objeto en json
    }  

    public function obtenerProbabilidaesClaseRedes(){
        require 'model/RedesModel.php';
        $helper = new RedesModel();
        $datosRedes=$helper->obtenerProbabilidaesClaseRedes();
        header('Content-Type: application/json');
        echo json_encode($datosRedes);//convierte el objeto en json
    }  

    public function generarProbabilidaesAtributoRedes(){
        require 'model/RedesModel.php';
        $helper = new RedesModel();
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        if ($contentType === "application/json") {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);
            $helper->generarProbabilidaesAtributoRedes($decoded); 
        }
    }

}
?>
