<?php 
include_once 'public/header.php';
?>

<section id="contenido">
    <br>
    <h2 style="text-align: center;">Adivinar el sexo de un estudiante</h2>
    <form>
        <div class="row">
            <div class="form-group-col">
                <p>Estilo de Aprendizaje</p>
                <select id="estilo" name="estilo">
                    <option value="Divergente">Divergente</option>
                    <option value="Convergente">Convergente</option>
                    <option value="Asimilador">Asimilador</option>
                    <option value="Acomodador">Acomodador</option>
                </select>
            </div>
            <div class="form-group-col">
                <p>Recinto</p>
                <select id="recinto" name="recinto">
                    <option value="Paraiso">Paraiso</option>
                    <option value="Turrialba">Turrialba</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="form-group-col">
                <p>Promedio para Matrícula</p>
                <input type="text" id="promedio" name="promedio" placeholder="Ejem: 8.5">
                <span id="promedio_error" class="contact-form-error none">Solo números entre 0.0 - 10.0</span>
            </div>
        </div>
    </form>
	<br>
    <div class="buttonForms">
        <button class="button">Determinar Sexo Estudiante</button>
    </div>
	<br>
    <div id="resultado">
    </div>
    <script type="text/javascript" src="public/js/determinarSexoEstudiante.js"></script>
</section>
<?php 
include_once 'public/footer.php';
?>