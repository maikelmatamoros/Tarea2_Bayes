<?php 
	include_once 'public/header.php';
?>

<section id="contenido">
    <section id="principal">
        <br>
        <h2 style="text-align: center;">Adivinar el estilo de aprendizaje</h2>
        <br>
        <form>
            <div class="row">
                <div class="form-group-col">
                    <p>Recinto</p>
                    <select id="recinto" name="recinto">
                        <option value="Paraiso">Paraiso</option>
                        <option value="Turrialba">Turrialba</option>
                    </select>
                </div>
                <div class="form-group-col">
                    <p>Sexo</p>
                    <select id="sexo" name="sexo">
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
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
        <button class="button">Adivinar estilo de aprendizaje</button>
        <br>
        <div id="resultado"></div>

        <script type="text/javascript" src="public/js/determinarAdivinarEstilo.js"></script>
<?php 
	include_once 'public/footer.php';
?>