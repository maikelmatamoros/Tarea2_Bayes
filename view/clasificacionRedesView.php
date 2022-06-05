<?php 
	include_once 'public/header.php';
?>

<section id="contenido">
    <section id="principal">
        <br>
        <h2 style="text-align: center;">Determinar la clasificación de redes</h2>
        <form>
            <div class="row">
                <div class="form-group-col">
                    <p>Confiabilidad de Red</p>
                    <input type='number' id="confiabilidad" value="2" name="confiabilidad" min='2' max='7' step='1' required>
                    <span id="confiabilidad_error" class="contact-form-error none">Solo números entre 2 - 7</span>
                </div>

                <div class="form-group-col">
                    <p>Número de enlaces</p>
                    <input type='number' id="numero" name="numero" value="7" min='7' max='20' step='1' required>
                    <span id="numero_error" class="contact-form-error none">Solo números entre 7 - 20</span>
                </div>
            </div>
            <div class="row">
                <div class="form-group-col">
                    <p>Capacidad</p>
                    <select id="capacidad" name="capacidad">
                        <option value="Low">Baja</option>
                        <option value="Medium">Media</option>
                        <option value="High">Alta</option>
                    </select>
                </div>

                <div class="form-group-col">
                    <p>Costo</p>
                    <select id="costo" name="costo">
                        <option value="Low">Bajo</option>
                        <option value="Medium">Medio</option>
                        <option value="High">Alto</option>
                    </select>
                </div>
            </div>
        </form>
		<br>
		<br>
        <div class="buttonForms">
            <button class="button"">Determinar Redes</button>
        </div>
        <div id="resultado"></div>

    </section>
</section>

<script type="text/javascript" src="public/js/determinarRedes.js"></script>
<?php 
	include_once 'public/footer.php';
?>