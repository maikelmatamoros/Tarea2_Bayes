<?php
class AdivinarEstiloController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function adivinarEstilo() {
        $this->view->show("adivinarEstiloView.php");//se llama a la vista
    }

    public function obtenerFrecuenciaDeterminarEstilo(){
        require 'model/DeterminarEstiloModel.php';
        $helper = new DeterminarEstiloModel();
        $datosDeterminarEstilo=$helper->obtenerFrecuenciasDeterminarEstilo();
        header('Content-Type: application/json');
        echo json_encode($datosDeterminarEstilo);//convierte el objeto en json
    }   

    public function obtenerProbabilidaesAtributoDeterminarEstilo(){
        require 'model/DeterminarEstiloModel.php';
        $helper = new DeterminarEstiloModel();
        $datosDeterminarEstilo=$helper->obtenerProbabilidaesAtributoDeterminarEstilo();
        header('Content-Type: application/json');
        echo json_encode($datosDeterminarEstilo);//convierte el objeto en json
    }  

    public function obtenerProbabilidaesClaseDeterminarEstilo(){
        require 'model/DeterminarEstiloModel.php';
        $helper = new DeterminarEstiloModel();
        $datosDeterminarEstilo=$helper->obtenerProbabilidaesClaseDeterminarEstilo();
        header('Content-Type: application/json');
        echo json_encode($datosDeterminarEstilo);//convierte el objeto en json
    }  

    public function generarProbabilidaesAtributoDeterminarEstilo(){
        require 'model/DeterminarEstiloModel.php';
        $helper = new DeterminarEstiloModel();
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        if ($contentType === "application/json") {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);
            $helper->generarProbabilidaesAtributoDeterminarEstilo($decoded); 
        }
    }
}
?>
