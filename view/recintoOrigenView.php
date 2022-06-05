<?php 
include_once 'public/header.php';
?>

<section id="contenido">
        <br>
        <h2 style="text-align: center;">Adivinar el recinto de origen</h2>
        <form">
            <div class="row">
                <div class="form-group-col">
                    <p>Estilo de Aprendizaje</p>
                    <select id="estilo" name="estilo">
                        <option value="DIVERGENTE">Divergente</option>
                        <option value="CONVERGENTE">Convergente</option>
                        <option value="ASIMILADOR">Asimilador</option>
                        <option value="ACOMODADOR">Acomodador</option>
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
			<br>
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
            <button class="button">Adivinar Recinto</button>
        </div>
        <div id="resultado"></div>
        <script type="text/javascript" src="public/js/determinarRecintoOrigen.js"></script>
</section>

<?php 
include_once 'public/footer.php';
?>