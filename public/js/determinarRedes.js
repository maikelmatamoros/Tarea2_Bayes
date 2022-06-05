//Esta porción del código se encarga de guardar en la base de datos las probabilidades
//NOTA: Se utilizó una sola vez llamandolo en el eventListener del DOMContentLoaded
//NOTA2: 
//--------------------------------------------------------------------------------------------//

//Arreglo donde se guardan las frecuencias para sacar las probabilidades de los atributos con 
//respecto a las clases
let frecuenciaRedes = [];

//Método que extrae de la base de datos las frecuencias y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerFrecuenciaRedes = async () => {
  try {
    let res = await fetch(
        "?controlador=ClasificacionRedes&accion=obtenerFrecuenciaRedes"
      ),
      json = await res.json();
      // console.log(json);
    if (!res.ok) throw { status: res.status, message: res.statusText };
    frecuenciaRedes = json;
    guardarProbabilidesRedes(generarProbabilidadesRedes());
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
};

//Método que guarda en la base de datos las probabilidades obtenidas con las frecuencias
const guardarProbabilidesRedes= async (probabilidades)=>{
  try {
    let res = await fetch("?controlador=ClasificacionRedes&accion=generarProbabilidaesAtributoRedes", {
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
const generarProbabilidadesRedes = ()=>{
  //se declaran algunas variables necesarias para generar la formula (nc + m*p)/(n + m)  
  let nc=0, m=4, p=0;
  const reliabilityP=1/4, numberP=1/14, capacityP=1/3, costoP=1/3;
  //Se declaran la cantidad de elementos por clase que existen en el set de datos
  //NOTA: al ser un trabajo estatico sin actualizar nada, se quemaron
  const claseA=16, claseB=19;
 
  //Arreglo donde se guaradarán las probabilidaes
  const probabilidades = [];
  
  /*Se recorre el array para poder guardar las frecuencias y el n de cada registro */
  frecuenciaRedes.forEach((el) => {
    if (el.atributo === "realibility" && el.clase === "A") {
      nc = el.frecuencia;
      p = reliabilityP;
      n = claseA;
    } else if (el.atributo === "realibility" && el.clase === "B") {
      nc = el.frecuencia;
      p = reliabilityP;
      n = claseB;
    } else if (el.atributo === "number" && el.clase === "A") {
      nc = el.frecuencia;
      p = numberP;
      n = claseA;
    } else if (el.atributo === "number" && el.clase === "B") {
      nc = el.frecuencia;
      p = numberP;
      n = claseB;
    } else if (el.atributo === "capacity" && el.clase === "A") {
      nc = el.frecuencia;
      p = capacityP;
      n = claseA;
    } else if (el.atributo === "capacity" && el.clase === "B") {
      nc = el.frecuencia;
      p = capacityP;
      n = claseB;
    } else if (el.atributo === "costo" && el.clase === "A") {
      nc = el.frecuencia;
      p = costoP;
      n = claseA;
    } else if (el.atributo === "costo" && el.clase === "B") {
      nc = el.frecuencia;
      p = costoP;
      n = claseB;
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
}
//--------------------------------------------------------------------------------------------------------//

//Arreglos para guardar las probabilidades para generar las respuestas usando Bayes
let probabilidadesAtributos = [];
let probabilidadesClase = [];

const validarForm = () =>{
  document.getElementById("resultado").innerHTML="";
  $d = document;
  let errors=0;
  if($d.getElementById("confiabilidad").value<2 || 
    $d.getElementById("confiabilidad").value>7 || 
      isNaN($d.getElementById("confiabilidad").value)){
    $d.getElementById("confiabilidad_error").classList.add("is-active") 
    errors++;
  }

  if($d.getElementById("numero").value<7 || 
    $d.getElementById("numero").value>20 ||
      isNaN($d.getElementById("numero").value)){
    $d.getElementById("numero_error").classList.add("is-active")
    errors++;
  }
  
  if(errors!=0) return false;
  else{
    $d.getElementById("confiabilidad_error").classList.remove("is-active");
    $d.getElementById("numero_error").classList.remove("is-active");
    determinarRedes();    
  }

}

//Método que permite obtener las probabiliades de las clases y las probabilidaes de los atributos
//NOTA: Este método se llama por defecto en el DOMContentLoaded
const obtenerProbabilidadesAtributoRedes = async () => {

    let res1 = await fetch(
        "?controlador=ClasificacionRedes&accion=obtenerProbabilidaesAtributoRedes"
      ), res2 = await fetch(
        "?controlador=ClasificacionRedes&accion=obtenerProbabilidaesClaseRedes");
      
    if (!res1.ok) throw { status: res1.status, message: res1.statusText };
    probabilidadesAtributos = await res1.json();
    probabilidadesClase = await res2.json();
};

const determinarRedes=()=> {
  //Se declaran variables para guardar los resultados de los atributos para cada clase
  let confiabilidadClaseA=0, numeroClaseA=0, capacidadClaseA=0, costoClaseA=0;
  let confiabilidadClaseB=0, numeroClaseB=0, capacidadClaseB=0, costoClaseB=0;

  /*Se guardan los valores que ingreso el usuario*/
  const realibility=parseInt(document.getElementById("confiabilidad").value);
  const number=parseInt(document.getElementById("numero").value);
  const capacity=document.getElementById("capacidad").value;
  const costo=document.getElementById("costo").value;

  /*Se recorre el array donde se tienen guardadas las probabilidades, se evalua el atributo y el valor 
  con el ingresado por el usuario para asi poder encontrar en el array la probabilidad correcta de 
  cada atributo*/
  probabilidadesAtributos.forEach((el)=>{
    
    if (el.atributo==="realibility" && el.valor==realibility){
      el.clase == "A"? confiabilidadClaseA=el.probabilidad: confiabilidadClaseB=el.probabilidad;   			
    }
    if (el.atributo==="number" && el.valor==number){
      el.clase == "A"? numeroClaseA=el.probabilidad:numeroClaseB=el.probabilidad;    			
    }
    if (el.atributo==="capacity" && el.valor==capacity){
      el.clase == "A"?capacidadClaseA=el.probabilidad:capacidadClaseB=el.probabilidad;    			
    }
    if (el.atributo==="costo" && el.valor==costo){
      el.clase == "A"?costoClaseA=el.probabilidad:costoClaseB=el.probabilidad; 
    }
   })

  /*Primero se realizan las multiplicacion de las probabilidades de cada atributo para cada clase*/
  let claseA=confiabilidadClaseA*numeroClaseA*capacidadClaseA*costoClaseA;
  let claseB=confiabilidadClaseB*numeroClaseB*capacidadClaseB*costoClaseB;
  /*Se recorre el array donde se tiene guardado las probabilidades de cada clase y se realiza la multiplicacion
    para sacar la probabilidad total de cada clase y se guarda en una variable*/
  probabilidadesClase.forEach((el) => {
     el.clase == "A"
       ? (claseA = claseA * el.probabilidad)
       : (claseB = claseB * el.probabilidad);
   });
   
  /*Con las probabilidades obtenidas, se revisa cual es la mayor y se le aclara al usuario en la
    vista donde ingresó la información*/
  document.getElementById('resultado').innerHTML="Clasificacion de red: Clase "+(claseA>claseB?"A": "B");
}


document.addEventListener("DOMContentLoaded", obtenerProbabilidadesAtributoRedes);
document
  .querySelector("button")
  .addEventListener("click", () => validarForm());