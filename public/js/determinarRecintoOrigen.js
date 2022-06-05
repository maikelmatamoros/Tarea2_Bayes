//Esta porción del código se encarga de guardar en la base de datos las probabilidades
//NOTA: Se utilizó una sola vez llamandolo en el eventListener del DOMContentLoaded
//NOTA2: 
//--------------------------------------------------------------------------------------------//

//Arreglo donde se guardan las frecuencias para sacar las probabilidades de los atributos con 
//respecto a las clases
let frecuenciaRecinto = [];

//Método que extrae de la base de datos las frecuencias y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerFrecuenciaRecinto = async () => {
  let res = await fetch(
      "?controlador=RecintoOrigen&accion=obtenerFrecuenciaRecinto"
    ),
    json = await res.json();
  frecuenciaRecinto = json;
  guardarProbabilidesRecinto(generarProbabilidadesRecinto());

};

//Método que guarda en la base de datos las probabilidades obtenidas con las frecuencias
const guardarProbabilidesRecinto= async (probabilidades)=>{
  try {
    let res = await fetch("?controlador=RecintoOrigen&accion=generarProbabilidaesAtributoRecinto", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(probabilidades)
    });
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
}

//Método que genera las probabilides en base a las frecuencias extraidas de la base de datos
const generarProbabilidadesRecinto = () => {
  //se declaran algunas variables necesarias para generar la formula (nc + m*p)/(n + m)
  let nc = 0, m = 3, p = 0;
  let estiloP = 1 / 4, promedioP = 1 / 4, sexoP = 1 / 2;
  
  //Se declaran la cantidad de elementos por clase que existen en el set de datos
  //NOTA: al ser un trabajo estatico sin actualizar nada, se quemaron
  let claseTurrialba = 39, claseParaiso = 38;
  
  //Arreglo donde se guaradarán las probabilidaes
  const probabilidades = [];
  
  /*Se recorre el array para poder guardar las frecuencias y el n de cada registro */
  frecuenciaRecinto.forEach((el) => {
    if (el.atributo === "estilo" && el.clase === "Turrialba") {
      nc = el.frecuencia;
      p = estiloP;
      n = claseTurrialba;
    } else if (el.atributo === "estilo" && el.clase === "Paraiso") {
      nc = el.frecuencia;
      p = estiloP;
      n = claseParaiso;
    } else if (el.atributo === "promedio" && el.clase === "Turrialba") {
      nc = el.frecuencia;
      p = promedioP;
      n = claseTurrialba;
    } else if (el.atributo === "promedio" && el.clase === "Paraiso") {
      nc = el.frecuencia;
      p = promedioP;
      n = claseParaiso;
    } else if (el.atributo === "sexo" && el.clase === "Turrialba") {
      nc = el.frecuencia;
      p = sexoP;
      n = claseTurrialba;
    } else if (el.atributo === "sexo" && el.clase === "Paraiso") {
      nc = el.frecuencia;
      p = sexoP;
      n = claseParaiso;
    }

    /*Se realiza la formula de bayes para sacar las probabilidades de cada atributo de la clase*/  
    let probabilidad = (Number(nc) + Number(m * p)) / (Number(n) + Number(m));
    /*Se crea un objeto donde se guardara los resultados de las probabilidades para luego guardarlo 
      en un array */
    probabilidades.push({
          atributo: el.atributo,
          clase: el.clase,
          probabilidad: probabilidad,
          valor: el.valor,
        });
  });
  return probabilidades;
};

//--------------------------------------------------------------------------------------------------------//
//Arreglos para guardar las probabilidades para generar las respuestas usando Bayes
let probabilidadesAtributos = [];
let probabilidadesClase = [];

//Método que permite obtener las probabiliades de las clases y las probabilidaes de los atributos
//NOTA: Este método se llama por defecto en el DOMContentLoaded

const obtenerProbabilidadesAtributoRecinto = async () => {
  let res1 = await fetch(
      "?controlador=RecintoOrigen&accion=obtenerProbabilidaesAtributoRecinto"
    ), res2 = await fetch(
      "?controlador=RecintoOrigen&accion=obtenerProbabilidaesClaseRecinto");
  probabilidadesAtributos = await res1.json();
  probabilidadesClase = await res2.json();

};

const validarForm = () => {
  document.getElementById("resultado").innerHTML = "";
  $d = document;
  let errors = 0;
  if (
    !$d.getElementById("promedio").value ||
    $d.getElementById("promedio").value < 0.0 ||
    $d.getElementById("promedio").value > 10.0 ||
    isNaN($d.getElementById("promedio").value)
  ) {
    $d.getElementById("promedio_error").classList.add("is-active");
  } else {
    $d.getElementById("promedio_error").classList.remove("is-active");
    determinarRecinto();
  }
};


const determinarRecinto = () => {
  //Se declaran variables para guardar los resultados de los atributos para cada clase
  let estiloT = 0,
    promedioT = 0,
    sexoT = 0;
  let estiloP = 0,
    promedioP = 0,
    sexoP = 0;

  /*Se guardan los valores que ingreso el usuario*/
  const estilo = document.getElementById("estilo").value;
  const promedio = parseFloat(
    document.getElementById("promedio").value
  ).toFixed(1);
  const sexo = document.getElementById("sexo").value;

  /*Se recorre el array donde se tienen guardadas las probabilidades, se evalua el atributo y el valor 
  con el ingresado por el usuario para asi poder encontrar en el array la probabilidad correcta de 
  cada atributo*/
  probabilidadesAtributos.forEach((el) => {
    if (el.atributo === "estilo" && el.valor == estilo) {
      el.clase === "Turrialba"
        ? (estiloT = el.probabilidad)
        : (estiloP = el.probabilidad);
    }
    if (el.atributo === "promedio" && el.valor == promedio) {
      el.clase === "Turrialba"
        ? (promedioT = el.probabilidad)
        : (promedioP = el.probabilidad);
    }
    if (el.atributo === "sexo" && el.valor == sexo) {
      el.clase === "Turrialba"
        ? (sexoT = el.probabilidad)
        : (sexoP = el.probabilidad);
    }
  });

  /*Primero se realizan las multiplicacion de las probabilidades de cada atributo para cada clase*/
  let pTurrialba = estiloT * promedioT * sexoT;
  let pParaiso = estiloP * promedioP * sexoP;

  /*Se recorre el array donde se tiene guardado las probabilidades de cada clase y se realiza la multiplicacion
  para sacar la probabilidad total de cada clase y se guarda en una variable*/
  probabilidadesClase.forEach((el) => {
    el.clase === "Turrialba"
      ? (pTurrialba = pTurrialba * el.probabilidad)
      : (pParaiso = pParaiso * el.probabilidad);
  });

  /*Con las probabilidades obtenidas, se revisa cual es la mayor y se le aclara al usuario en la
  vista donde ingresó la información*/
  document.getElementById("resultado").innerHTML =
    "Recinto de origen: " + (pTurrialba > pParaiso ? "Turrialba" : "Paraiso");
}

document.addEventListener("DOMContentLoaded", obtenerProbabilidadesAtributoRecinto);
document.querySelector("button").addEventListener("click", () => validarForm());
