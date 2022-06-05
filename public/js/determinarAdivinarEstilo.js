//Esta porción del código se encarga de guardar en la base de datos las probabilidades
//NOTA: Se utilizó una sola vez llamandolo en el eventListener del DOMContentLoaded
//NOTA2: 
//--------------------------------------------------------------------------------------------//

//Arreglo donde se guardan las frecuencias para sacar las probabilidades de los atributos con 
//respecto a las clases
let frecuenciaEstilo = [];

//Método que extrae de la base de datos las frecuencias y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerFrecuenciaEstilo = async () => {
  let res = await fetch(
      "?controlador=AdivinarEstilo&accion=obtenerFrecuenciaDeterminarEstilo"
    ),
    json = await res.json();
  frecuenciaEstilo = json;
  guardarProbabilidesEstilo(generarProbabilidadesEstilo());

};

//Método que guarda en la base de datos las probabilidades obtenidas con las frecuencias
const guardarProbabilidesEstilo= async (probabilidades)=>{
  try {
    let res = await fetch("?controlador=AdivinarEstilo&accion=generarProbabilidaesAtributoDeterminarEstilo", {
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
const generarProbabilidadesEstilo = () => {
  //se declaran algunas variables necesarias para generar la formula (nc + m*p)/(n + m)
  let nc=0, m=3, p=0;
  const recintoP=1/2, promedioP=1/4, sexoP=1/2;
  
  //Se declaran la cantidad de elementos por clase que existen en el set de datos
  //NOTA: al ser un trabajo estatico sin actualizar nada, se quemaron
  const claseAcomodador=14;
  const claseAsimilador=21;
  const claseConvergente=21;
  const claseDivergente=21;
  const probabilidades = [];
  
  /*Se recorre el array para poder guardar las frecuencias, el n de cada registro*/
  frecuenciaEstilo.forEach((el)=>{
    if(el.atributo==="recinto" && el.clase==="ACOMODADOR"){
          nc=el.frecuencia;
          p=recintoP;
          n=claseAcomodador;
      }else if(el.atributo==="recinto" && el.clase==="ASIMILADOR"){
          nc=el.frecuencia;
          p=recintoP;
          n=claseAsimilador;
      }else if(el.atributo==="recinto" && el.clase==="CONVERGENTE"){
          nc=el.frecuencia;
          p=recintoP;
          n=claseConvergente;
      }else if(el.atributo==="recinto" && el.clase==="DIVERGENTE"){
          nc=el.frecuencia;
          p=recintoP;
          n=claseDivergente;
      } else if(el.atributo==="promedio" && el.clase==="ACOMODADOR"){
          nc=el.frecuencia;
          p=promedioP;
          n=claseAcomodador;
      }else if(el.atributo==="promedio" && el.clase==="ASIMILADOR"){
          nc=el.frecuencia;
          p=promedioP;
          n=claseAsimilador;
      }else if(el.atributo==="promedio" && el.clase==="CONVERGENTE"){
          nc=el.frecuencia;
          p=promedioP;
          n=claseConvergente;
      }else if(el.atributo==="promedio" && el.clase==="DIVERGENTE"){
          nc=el.frecuencia;
          p=promedioP;
          n=claseDivergente;
      } else if(el.atributo==="sexo" && el.clase==="ACOMODADOR"){
          nc=el.frecuencia;
          p=sexoP;
          n=claseAcomodador;
      }else if(el.atributo==="sexo" && el.clase==="ASIMILADOR"){
          nc=el.frecuencia;
          p=sexoP;
          n=claseAsimilador; 
      }else if(el.atributo==="sexo" && el.clase==="CONVERGENTE"){
          nc=el.frecuencia;
          p=sexoP;
          n=claseConvergente;
      }else if(el.atributo==="sexo" && el.clase==="DIVERGENTE"){
          nc=el.frecuencia;
          p=sexoP;
          n=claseDivergente;                                          
      }

      /*Se realiza la formula de bayes para sacar las probabilidades de cada atributo de la clase*/          
      let probabilidad=(Number(nc)+ Number(m*p))/(Number(n)+Number(m)); 

      /*Se crea un objeto donde se guardara los resultados de las probabilidades para luego guardarlo 
      en un array */
      probabilidades.push({
        atributo: el.atributo,
        clase: el.clase,
        probabilidad: probabilidad,
        valor: el.valor,
      });
  })
  return probabilidades;      
}

//----------------------------------------------------------------------------------------------------//

//Arreglos para guardar las probabilidades para generar las respuestas usando Bayes
let probabilidadesAtributos = [];
let probabilidadesClase = [];


//Método que permite obtener las probabiliades de las clases y las probabilidaes de los atributos
//NOTA: Este método se llama por defecto en el DOMContentLoaded
const obtenerProbabilidadesAtributoEstilo = async () => {
  let res1 = await fetch(
      "?controlador=AdivinarEstilo&accion=obtenerProbabilidaesAtributoDeterminarEstilo"
    ), res2 = await fetch(
      "?controlador=AdivinarEstilo&accion=obtenerProbabilidaesClaseDeterminarEstilo");
  probabilidadesAtributos = await res1.json();
  probabilidadesClase = await res2.json();
};


const validarForm = () =>{
  document.getElementById("resultado").innerHTML="";
  $d = document;
  let errors=0;
  if(!$d.getElementById("promedio").value ||
    $d.getElementById("promedio").value<0.0 ||
     $d.getElementById("promedio").value>10.0 ||
      isNaN($d.getElementById("promedio").value) 
     ){
    $d.getElementById("promedio_error").classList.add("is-active") 
  }
  else{
    $d.getElementById("promedio_error").classList.remove("is-active");
    determinarEstilo();    
  }
}

const determinarEstilo = () => {
  //Se declaran variables para guardar los resultados de los atributos para cada clase
  let recintoAcomodador = 0, promedioAcomodador = 0, sexoAcomodador = 0;
  let recintoAsimilador = 0, promedioAsimilador = 0, sexoAsimilador = 0;
  let recintoDivergente = 0, promedioDivergente = 0, sexoDivergente = 0;
  let recintoConvergente = 0, promedioConvergente = 0, sexoConvergente = 0;

  /*Se guardan los valores que ingreso el usuario*/
  const recinto = document.getElementById("recinto").value;
  const promedio = parseFloat(document.getElementById("promedio").value).toFixed(1);
  const sexo = document.getElementById("sexo").value;
  

  /*Se recorre el array donde se tienen guardadas las probabilidades, se evalua el atributo y el valor 
  con el ingresado por el usuario para asi poder encontrar en el array la probabilidad correcta de 
  cada atributo*/
  probabilidadesAtributos.forEach((el) => {
    if (el.atributo === "recinto" && el.valor == recinto) {
      if (el.clase === "ACOMODADOR") {
        recintoAcomodador = el.probabilidad;
      } else if (el.clase === "ASIMILADOR") {
        recintoAsimilador = el.probabilidad;
      } else if (el.clase === "CONVERGENTE") {
        recintoConvergente = el.probabilidad;
      } else if (el.clase === "DIVERGENTE") {
        recintoDivergente = el.probabilidad;
      }
    }
    if (
      el.atributo === "promedio" &&
      parseFloat(el.valor).toFixed(1) == promedio
    ) {
      if (el.clase === "ACOMODADOR") {
        promedioAcomodador = el.probabilidad;
      } else if (el.clase === "ASIMILADOR") {
        promedioAsimilador = el.probabilidad;
      } else if (el.clase === "CONVERGENTE") {
        promedioConvergente = el.probabilidad;
      } else if (el.clase === "DIVERGENTE") {
        promedioDivergente = el.probabilidad;
      }
    }
    if (el.atributo === "sexo" && el.valor == sexo) {
      if (el.clase === "ACOMODADOR") {
        sexoAcomodador = el.probabilidad;
      } else if (el.clase === "ASIMILADOR") {
        sexoAsimilador = el.probabilidad;
      } else if (el.clase === "CONVERGENTE") {
        sexoConvergente = el.probabilidad;
      } else if (el.clase === "DIVERGENTE") {
        sexoDivergente = el.probabilidad;
      }
    }
  });
  /*Primero se realizan las multiplicacion de las probabilidades de cada atributo para cada clase*/
  let acomodador = recintoAcomodador * promedioAcomodador * sexoAcomodador;
  let asimilador = recintoAsimilador * promedioAsimilador * sexoAsimilador;
  let divergente = recintoDivergente * promedioDivergente * sexoDivergente;
  let convergente = recintoConvergente * promedioConvergente * sexoConvergente;

  /*Se recorre el array donde se tiene guardado las probabilidades de cada clase y se realiza la multiplicacion
    para sacar la probabilidad total de cada clase y se guarda en una variable*/
  probabilidadesClase.forEach((el) => {
    if (el.clase === "ACOMODADOR") {
      acomodador = acomodador * el.probabilidad;
    } else if (el.clase === "ASIMILADOR") {
      asimilador = asimilador * el.probabilidad;
    } else if (el.clase === "CONVERGENTE") {
      convergente = convergente * el.probabilidad;
    } else {
      divergente = divergente * el.probabilidad;
    }
  });

  /*Con las probabilidades obtenidas, se revisa cual es la mayor y se le aclara al usuario en la
    vista donde ingresó la información*/
  if (acomodador > asimilador && acomodador > divergente && acomodador > convergente
  ) {
    document.getElementById("resultado").innerHTML ="Estilo de Aprendizaje: ACOMODADOR";
  } else if (asimilador > acomodador && asimilador > divergente && asimilador > convergente
  ) {
    document.getElementById("resultado").innerHTML ="Estilo de Aprendizaje: ASIMILADOR";
  } else if (divergente > acomodador && divergente > asimilador && divergente > convergente
  ) {
    document.getElementById("resultado").innerHTML ="Estilo de Aprendizaje: DIVERGENTE";
  } else if (convergente > acomodador && convergente > asimilador && convergente > divergente
  ) {
    document.getElementById("resultado").innerHTML ="Estilo de Aprendizaje: CONVERGENTE";
  }
};


document.addEventListener(
  "DOMContentLoaded",
  obtenerProbabilidadesAtributoEstilo
);

document.querySelector("button").addEventListener("click", () => validarForm());