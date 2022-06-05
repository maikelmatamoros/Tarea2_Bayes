<?php
class SexoEstudianteController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function sexoEstudiante() {
        $this->view->show("sexoEstudianteView.php");//se llama a la vista  
        
    }

    /**
     * It returns a json object with the data from the database
     */
    public function obtenerFrecuenciaSexo(){
        require 'model/SexoModel.php';
        $helper = new SexoModel();
        $datosSexos=$helper->obtenerFrecuenciasSexo();
        header('Content-Type: application/json');
        echo json_encode($datosSexos);//convierte el objeto en json
    }   

    public function obtenerProbabilidaesAtributoSexo(){
        require 'model/SexoModel.php';
        $helper = new SexoModel();
        $datosSexos=$helper->obtenerProbabilidaesAtributoSexo();
        header('Content-Type: application/json');
        echo json_encode($datosSexos);//convierte el objeto en json
    }  

    public function obtenerProbabilidaesClaseSexo(){
        require 'model/SexoModel.php';
        $helper = new SexoModel();
        $datosSexos=$helper->obtenerProbabilidaesAtributoSexo();
        header('Content-Type: application/json');
        echo json_encode($datosSexos);//convierte el objeto en json
    }  

    public function generarProbabilidaesAtributoSexo(){
        require 'model/SexoModel.php';
        $helper = new SexoModel();
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        if ($contentType === "application/json") {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);
            $helper->generarProbabilidaesAtributoSexo($decoded); 
        }
    }

}
?>
