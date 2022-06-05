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
      "?controlador=EstiloAprendizaje&accion=obtenerFrecuenciaAdivinarAprendizaje"
    ),
    json = await res.json();
  frecuenciaEstilo = json;
  guardarProbabilidesEstilo(generarProbabilidadesEstilo());

};

//Método que guarda en la base de datos las probabilidades obtenidas con las frecuencias
const guardarProbabilidesEstilo= async (probabilidades)=>{
  try {
    let res = await fetch("?controlador=EstiloAprendizaje&accion=generarProbabilidaesAtributoAdivinarAprendizaje", {
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
const generarProbabilidadesEstilo = () =>{
  //se declaran algunas variables necesarias para generar la formula (nc + m*p)/(n + m)
  let nc=0, m=4, p=1/19;

  //Se declaran la cantidad de elementos por clase que existen en el set de datos
  //NOTA: al ser un trabajo estatico sin actualizar nada, se quemaron
  const claseACOMODADOR=69, claseASIMILADOR=41, claseCONVERGENTE=60, claseDIVERGENTE=52;
  
  //Arreglo donde se guaradarán las probabilidaes
  const probabilidades=[];

  /*Se recorre el array para poder guardar las frecuencias y el n de cada registro */
  frecuenciaEstilo.forEach((el)=>{         
      if(el.atributo==="ca" && el.clase==="ACOMODADOR"){
          nc=el.frecuencia;
          n=claseACOMODADOR;
      }else if(el.atributo==="ca" && el.clase==="ASIMILADOR"){
          nc=el.frecuencia;
          n=claseASIMILADOR;
      }else if(el.atributo==="ca" && el.clase==="CONVERGENTE"){
          nc=el.frecuencia;
          n=claseCONVERGENTE;
      }else if(el.atributo==="ca" && el.clase==="DIVERGENTE"){
          nc=el.frecuencia;
          n=claseDIVERGENTE;
      }else if(el.atributo==="ec" && el.clase==="ACOMODADOR"){
          nc=el.frecuencia;
          n=claseACOMODADOR;
      }else if(el.atributo==="ec" && el.clase==="ASIMILADOR"){
          nc=el.frecuencia;
          n=claseASIMILADOR;
      }else if(el.atributo==="ec" && el.clase==="CONVERGENTE"){
          nc=el.frecuencia;
          n=claseCONVERGENTE;
      }else if(el.atributo==="ec" && el.clase==="DIVERGENTE"){
          nc=el.frecuencia;
          n=claseDIVERGENTE;
      }else if(el.atributo==="ea" && el.clase==="ACOMODADOR"){
          nc=el.frecuencia;
          n=claseACOMODADOR;
      }else if(el.atributo==="ea" && el.clase==="ASIMILADOR"){
          nc=el.frecuencia;
          n=claseASIMILADOR;
      }else if(el.atributo==="ea" && el.clase==="CONVERGENTE"){
          nc=el.frecuencia;
          n=claseCONVERGENTE;
      }else if(el.atributo==="ea" && el.clase==="DIVERGENTE"){
          nc=el.frecuencia;
          n=claseDIVERGENTE;
      }else if(el.atributo==="or" && el.clase==="ACOMODADOR"){
          nc=el.frecuencia;
          n=claseACOMODADOR;
      }else if(el.atributo==="or" && el.clase==="ASIMILADOR"){
          nc=el.frecuencia;
          n=claseASIMILADOR;
      }else if(el.atributo==="or" && el.clase==="CONVERGENTE"){
          nc=el.frecuencia;
          n=claseCONVERGENTE;
      }else if(el.atributo==="or" && el.clase==="DIVERGENTE"){
          nc=el.frecuencia;
          n=claseDIVERGENTE; 
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
  });
  return probabilidades;      
}
//--------------------------------------------------------------------------------------------------------//

//Arreglos para guardar las probabilidades para generar las respuestas usando Bayes
let probabilidadesAtributos = [];
let probabilidadesClase = [];


//Método que permite obtener las probabiliades de las clases y las probabilidaes de los atributos
//NOTA: Este método se llama por defecto en el DOMContentLoaded
const obtenerProbabilidadesAtributoEstilo = async () => {
  let res1 = await fetch(
      "?controlador=EstiloAprendizaje&accion=obtenerProbabilidaesAtributoAdivinarAprendizaje"
    ), res2 = await fetch(
      "?controlador=EstiloAprendizaje&accion=obtenerProbabilidaesClaseAdivinarAprendizaje");
  probabilidadesAtributos = await res1.json();
  probabilidadesClase = await res2.json();
};


const calcularEstilo =() =>{
  //Se declaran variables para guardar los resultados de los atributos para cada clase
  let caAcomodador=0, ecAcomodador=0, eaAcomodador=0, orAcomodador=0;
  let caAsimilador=0, ecAsimilador=0, eaAsimilador=0, orAsimilador=0;
  let caDivergente=0, ecDivergente=0, eaDivergente=0, orDivergente=0;
  let caConvergente=0, ecConvergente=0, eaConvergente=0, orConvergente=0;    	

  /*Se guardan los valores que ingreso el usuario*/
  const ec =
    parseInt(document.getElementById("5").value) +
    parseInt(document.getElementById("9").value) +
    parseInt(document.getElementById("13").value) +
    parseInt(document.getElementById("17").value) +
    parseInt(document.getElementById("25").value) +
    parseInt(document.getElementById("29").value);
  const or =
    parseInt(document.getElementById("2").value) +
    parseInt(document.getElementById("10").value) +
    parseInt(document.getElementById("22").value) +
    parseInt(document.getElementById("26").value) +
    parseInt(document.getElementById("30").value) +
    parseInt(document.getElementById("34").value);
  const ca =
    parseInt(document.getElementById("7").value) +
    parseInt(document.getElementById("11").value) +
    parseInt(document.getElementById("15").value) +
    parseInt(document.getElementById("19").value) +
    parseInt(document.getElementById("31").value) +
    parseInt(document.getElementById("35").value);
  const ea =
    parseInt(document.getElementById("4").value) +
    parseInt(document.getElementById("12").value) +
    parseInt(document.getElementById("24").value) +
    parseInt(document.getElementById("28").value) +
    parseInt(document.getElementById("32").value) +
    parseInt(document.getElementById("36").value);

      
  /*Se recorre el array donde se tienen guardadas las probabilidades, se evalua el atributo y el valor 
  con el ingresado por el usuario para asi poder encontrar en el array la probabilidad correcta de 
  cada atributo*/
  probabilidadesAtributos.forEach((el) => {
    if (el.atributo === "ca" && el.valor == ca) {
      if (el.clase === "ACOMODADOR") {
        caAcomodador = el.probabilidad;
      } else if (el.clase === "ASIMILADOR") {
        caAsimilador = el.probabilidad;
      } else if (el.clase === "CONVERGENTE") {
        caConvergente = el.probabilidad;
      } else if (el.clase === "DIVERGENTE") {
        caDivergente = el.probabilidad;
      }
    }
    if (el.atributo === "ec" && el.valor == ec) {
      if (el.clase === "ACOMODADOR") {
        ecAcomodador = el.probabilidad;
      } else if (el.clase === "ASIMILADOR") {
        ecAsimilador = el.probabilidad;
      } else if (el.clase === "CONVERGENTE") {
        ecConvergente = el.probabilidad;
      } else if (el.clase === "DIVERGENTE") {
        ecDivergente = el.probabilidad;
      }
    }
    if (el.atributo === "ea" && el.valor == ea) {
      if (el.clase === "ACOMODADOR") {
        eaAcomodador = el.probabilidad;
      } else if (el.clase === "ASIMILADOR") {
        eaAsimilador = el.probabilidad;
      } else if (el.clase === "CONVERGENTE") {
        eaConvergente = el.probabilidad;
      } else if (el.clase === "DIVERGENTE") {
        eaDivergente = el.probabilidad;
      }
    }
    if (el.atributo === "or" && el.valor == or) {
      if (el.clase === "ACOMODADOR") {
        orAcomodador = el.probabilidad;
      } else if (el.clase === "ASIMILADOR") {
        orAsimilador = el.probabilidad;
      } else if (el.clase === "CONVERGENTE") {
        orConvergente = el.probabilidad;
      } else if (el.clase === "DIVERGENTE") {
        orDivergente = el.probabilidad;
      }
    }
  });   		
  
  /*Primero se realizan las multiplicacion de las probabilidades de cada atributo para cada clase*/
  let acomodador=caAcomodador*ecAcomodador*eaAcomodador*orAcomodador;
  let asimilador=caAsimilador*ecAsimilador*eaAsimilador*orAsimilador;
  let divergente=caDivergente*ecDivergente*eaDivergente*orDivergente;
  let convergente=caConvergente*ecConvergente*eaConvergente*orConvergente;

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
  if(acomodador>asimilador && acomodador>divergente && acomodador>convergente){
    document.getElementById('resultado').innerHTML="Estilo de Aprendizaje: ACOMODADOR";
  }else if(asimilador>acomodador && asimilador>divergente && asimilador>convergente){
    document.getElementById('resultado').innerHTML="Estilo de Aprendizaje: ASIMILADOR";
  }else if(divergente>acomodador && divergente>asimilador && divergente>convergente){
    document.getElementById('resultado').innerHTML="Estilo de Aprendizaje: DIVERGENTE";
  }else if(convergente>acomodador && convergente>asimilador && convergente>divergente){
    document.getElementById('resultado').innerHTML="Estilo de Aprendizaje: CONVERGENTE";
  }
}


  document.addEventListener(
    "DOMContentLoaded",
    obtenerProbabilidadesAtributoEstilo
  );
  
  document
    .querySelector("button")
    .addEventListener("click", () => calcularEstilo());