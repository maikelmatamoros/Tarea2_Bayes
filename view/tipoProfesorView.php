<?php 
include_once 'public/header.php';
?>

<section id="contenido">
    <section id="principal">
        <h2 style="text-align: center;">Determinar el tipo de Profesor</h2>
        <form>
            <div class="row">
                <div class="form-group-col">
                    <p>Edad</p>
                    <select id="a" name="a">
                        <option value="1">Menor o igual a 30</option>
                        <option value="2">Mayor a 30 y menor o igual a 55</option>
                        <option value="3">Mayor a 55</option>
                    </select>
                </div>
                <div class="form-group-col">
                    <p>Género</p>
                    <select id="b" name="b">
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                        <option value="NA">No disponible</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group-col">
                    <p>Habilidad o experiencia en la enseñanza</p>
                    <select id="c" name="c">
                        <option value="B">Principiante</option>
                        <option value="I">Intermedio</option>
                        <option value="A">Avanzado</option>
                    </select>
                </div>
                <div class="form-group-col">
                    <p>Veces que se ha impartido este tipo de cursos</p>
                    <select id="d" name="d">
                        <option value="1">Nunca</option>
                        <option value="2">1 a 5 veces</option>
                        <option value="3">Más de 5 veces</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group-col">
                    <p>Área de especialización</p>
                    <select id="e" name="e">
                        <option value="DM">Toma de decisiones</option>
                        <option value="ND">Diseño de red</option>
                        <option value="O">Otra</option>
                    </select>
                </div>
                <div class="form-group-col">
                    <p>Habilidad del uso de computadoras</p>
                    <select id="f" name="f">
                        <option value="L">Bajo</option>
                        <option value="A">Promedio</option>
                        <option value="H">Alto</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group-col">
                    <p>Experiencia en el uso de tecnologia basada en la web para la enseñanza</p>
                    <select id="g" name="g">
                        <option value="N">Nunca</option>
                        <option value="S">A veces</option>
                        <option value="O">Muchas veces</option>
                    </select>
                </div>
                <div class="form-group-col">
                    <p>Experiencia en el uso de un sitio web.</p>
                    <select id="h" name="h">
                        <option value="N">Nunca</option>
                        <option value="S">A veces</option>
                        <option value="O">Muchas veces</option>
                    </select>
                </div>
            </div>

        </form>
        <br>
        <br>
        <div class="buttonForms">
            <button class="button">Calcular Tipo Profesor</button>
        </div>
        <br>
        <div id="resultado">
        </div>
	</section>
</section>
<script type="text/javascript" src="public/js/determinarProfesor.js"></script>
        <?php 
include_once 'public/footer.php';
?>