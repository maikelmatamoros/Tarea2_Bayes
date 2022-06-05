//Esta porción del código se encarga de guardar en la base de datos las probabilidades
//NOTA: Se utilizó una sola vez llamandolo en el eventListener del DOMContentLoaded
//NOTA2: 
//--------------------------------------------------------------------------------------------//

//Arreglo donde se guardan las frecuencias para sacar las probabilidades de los atributos con 
//respecto a las clases
let frecuenciaProfesor = [];

//Método que extrae de la base de datos los registros relacionados y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerFrecuenciaProfesor = async () => {
  let res = await fetch(
      "?controlador=TipoProfesor&accion=obtenerFrecuenciaProfesor"
    ),
    json = await res.json();
  frecuenciaProfesor = json;
  guardarProbabilidesProfesor(generarProbabilidadesProfesor());

};

//Método que guarda en la base de datos las probabilidades obtenidas con las frecuencias
const guardarProbabilidesProfesor= async (probabilidades)=>{
  try {
    let res = await fetch("?controlador=TipoProfesor&accion=generarProbabilidaesAtributoProfesor", {
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
const generarProbabilidadesProfesor = ()=> {
  //se declaran algunas variables necesarias para generar la formula (nc + m*p)/(n + m)
  let nc = 0, m = 8, p = 1/3;
 
  //Se declaran la cantidad de elementos por clase que existen en el set de datos
  //NOTA: al ser un trabajo estatico sin actualizar nada, se quemaron
  
  const claseBeginner = 9, claseIntermediate = 6, claseAdvanced = 5;
  //Arreglo donde se guaradarán las probabilidaes
  const probabilidades = [];
  
    /*Se recorre el array para poder guardar las frecuencias y el n de cada registro */
  frecuenciaProfesor.forEach((el) => {
    if (el.atributo === "a" && el.clase === "Beginner") {
      nc = el.frecuencia;
      n = claseBeginner;
    } else if (el.atributo === "a" && el.clase === "Advanced") {
      nc = el.frecuencia;
      n = claseAdvanced;
    } else if (el.atributo === "a" && el.clase === "Intermediate") {
      nc = el.frecuencia;
      n = claseIntermediate;
    } else if (el.atributo === "b" && el.clase === "Beginner") {
      nc = el.frecuencia;
      n = claseBeginner;
    } else if (el.atributo === "b" && el.clase === "Advanced") {
      nc = el.frecuencia;
      n = claseAdvanced;
    } else if (el.atributo === "b" && el.clase === "Intermediate") {
      nc = el.frecuencia;
      n = claseIntermediate;
    } else if (el.atributo === "c" && el.clase === "Beginner") {
      nc = el.frecuencia;
      n = claseBeginner;
    } else if (el.atributo === "c" && el.clase === "Advanced") {
      nc = el.frecuencia;
      n = claseAdvanced;
    } else if (el.atributo === "c" && el.clase === "Intermediate") {
      nc = el.frecuencia;
      n = claseIntermediate;
    } else if (el.atributo === "d" && el.clase === "Beginner") {
      nc = el.frecuencia;
      n = claseBeginner;
    } else if (el.atributo === "d" && el.clase === "Advanced") {
      nc = el.frecuencia;
      n = claseAdvanced;
    } else if (el.atributo === "d" && el.clase === "Intermediate") {
      nc = el.frecuencia;
      n = claseIntermediate;
    } else if (el.atributo === "e" && el.clase === "Beginner") {
      nc = el.frecuencia;
      n = claseBeginner;
    } else if (el.atributo === "e" && el.clase === "Advanced") {
      nc = el.frecuencia;
      n = claseAdvanced;
    } else if (el.atributo === "e" && el.clase === "Intermediate") {
      nc = el.frecuencia;
      n = claseIntermediate;
    } else if (el.atributo === "f" && el.clase === "Beginner") {
      nc = el.frecuencia;
      n = claseBeginner;
    } else if (el.atributo === "f" && el.clase === "Advanced") {
      nc = el.frecuencia;
      n = claseAdvanced;
    } else if (el.atributo === "f" && el.clase === "Intermediate") {
      nc = el.frecuencia;
      n = claseIntermediate;
    } else if (el.atributo === "g" && el.clase === "Beginner") {
      nc = el.frecuencia;
      n = claseBeginner;
    } else if (el.atributo === "g" && el.clase === "Advanced") {
      nc = el.frecuencia;
      n = claseAdvanced;
    } else if (el.atributo === "g" && el.clase === "Intermediate") {
      nc = el.frecuencia;
      n = claseIntermediate;
    } else if (el.atributo === "h" && el.clase === "Beginner") {
      nc = el.frecuencia;
      n = claseBeginner;
    } else if (el.atributo === "h" && el.clase === "Advanced") {
      nc = el.frecuencia;
      n = claseAdvanced;
    } else if (el.atributo === "h" && el.clase === "Intermediate") {
      nc = el.frecuencia;
      n = claseIntermediate;
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

//Método que permite obtener las probabiliades de las clases y las probabilidaes de los atributos
//NOTA: Este método se llama por defecto en el DOMContentLoaded
const obtenerProbabilidadesAtributoProfesor = async () => {
  let res1 = await fetch(
      "?controlador=TipoProfesor&accion=obtenerProbabilidaesAtributoProfesor"
    ), res2 = await fetch(
      "?controlador=TipoProfesor&accion=obtenerProbabilidaesClaseProfesor");
  probabilidadesAtributos = await res1.json();
  probabilidadesClase = await res2.json();
};

const determinarProfesor = () => {
  //Se declaran variables para guardar los resultados de los atributos para cada clase
  let aBeginner=0, bBeginner=0, cBeginner=0, dBeginner=0, eBeginner=0,
    fBeginner=0, gBeginner=0, hBeginner=0;  
  let aIntermediate=0, bIntermediate=0, cIntermediate=0, dIntermediate=0, 
    eIntermediate=0, fIntermediate=0, gIntermediate=0, hIntermediate=0;
  let aAdvanced=0, bAdvanced=0, cAdvanced=0, dAdvanced=0, eAdvanced=0, 
    fAdvanced=0, gAdvanced=0, hAdvanced=0;


  /*Se guardan los valores que ingreso el usuario*/
  const a=parseInt(document.getElementById("a").value);
  const b=document.getElementById("b").value;
  const c=document.getElementById("c").value;
  const d=parseInt(document.getElementById("d").value);
  const e=document.getElementById("e").value;
  const f=document.getElementById("f").value;
  const g=document.getElementById("g").value;
  const h=document.getElementById("h").value;

  /*Se recorre el array donde se tienen guardadas las probabilidades, se evalua el atributo y el valor 
  con el ingresado por el usuario para asi poder encontrar en el array la probabilidad correcta de 
  cada atributo*/
  probabilidadesAtributos.forEach((el)=>{
      if (el.atributo==="a" && el.valor==a){
          if (el.clase==="Beginner"){
              aBeginner=el.probabilidad;
          }else if (el.clase==="Advanced"){
              aAdvanced=el.probabilidad;
          }else {
              aIntermediate=el.probabilidad;
          }               
      }
      if (el.atributo==="b" && el.valor==b){
          if (el.clase==="Beginner"){
              bBeginner=el.probabilidad;
          }else if (el.clase==="Advanced"){
              bAdvanced=el.probabilidad;
          }else {
              bIntermediate=el.probabilidad;
          }                 
      }
      if (el.atributo==="c" && el.valor==c){
          if (el.clase==="Beginner"){
              cBeginner=el.probabilidad;
          }else if (el.clase==="Advanced"){
              cAdvanced=el.probabilidad;
          }else {
              cIntermediate=el.probabilidad;
          }                 
      }
      if (el.atributo==="d" && el.valor==d){
          if (el.clase==="Beginner"){
              dBeginner=el.probabilidad;
          }else if (el.clase==="Advanced"){
              dAdvanced=el.probabilidad;
          }else {
              dIntermediate=el.probabilidad;
          } 
      }
      if (el.atributo==="e" && el.valor==e){
          if (el.clase==="Beginner"){
              eBeginner=el.probabilidad;
          }else if (el.clase==="Advanced"){
              eAdvanced=el.probabilidad;
          }else {
              eIntermediate=el.probabilidad;
          } 
      }
      if (el.atributo==="f" && el.valor==f){
          if (el.clase==="Beginner"){
              fBeginner=el.probabilidad;
          }else if (el.clase==="Advanced"){
              fAdvanced=el.probabilidad;
          }else {
              fIntermediate=el.probabilidad;
          } 
      }
      if (el.atributo==="g" && el.valor==g){
          if (el.clase==="Beginner"){
              gBeginner=el.probabilidad;
          }else if (el.clase==="Advanced"){
              gAdvanced=el.probabilidad;
          }else {
              gIntermediate=el.probabilidad;
          } 
      }
      if (el.atributo==="h" && el.valor==h){
          if (el.clase==="Beginner"){
              hBeginner=el.probabilidad;
          }else if (el.clase==="Advanced"){
              hAdvanced=el.probabilidad;
          }else {
              hIntermediate=el.probabilidad;
          } 
      }
  })
 
/*Primero se realizan las multiplicacion de las probabilidades de cada atributo para cada clase*/
  let claseBeginner=aBeginner*bBeginner*cBeginner*dBeginner*eBeginner*fBeginner*gBeginner*hBeginner;
  let claseIntermediate=aIntermediate*bIntermediate*cIntermediate*dIntermediate*eIntermediate*
    fIntermediate*gIntermediate*hIntermediate;
  let claseAdvanced=aAdvanced*bAdvanced*cAdvanced*dAdvanced*eAdvanced*fAdvanced*gAdvanced*hAdvanced;
  

  /*Se recorre el array donde se tiene guardado las probabilidades de cada clase y se realiza la multiplicacion
    para sacar la probabilidad total de cada clase y se guarda en una variable*/
  probabilidadesClase.forEach((el)=>{
      if (el.clase==="Beginner"){
          claseBeginner=claseBeginner*el.probabilidad;
      }else if (el.clase==="Advanced"){
          claseAdvanced=claseAdvanced*el.probabilidad;
      }else {
          claseIntermediate=claseIntermediate*el.probabilidad;
      }
  })
  /*Con las probabilidades obtenidas, se revisa cual es la mayor y se le aclara al usuario en la
    vista donde ingresó la información*/
  if(claseBeginner>claseAdvanced && claseBeginner>claseIntermediate){
      document.getElementById('resultado').innerHTML="Clase de Profesor: Beginner";
  }else if(claseAdvanced>claseBeginner && claseAdvanced>claseIntermediate){
      document.getElementById('resultado').innerHTML="Clase de Profesor: Advanced";
  }else{
      document.getElementById('resultado').innerHTML="Clase de Profesor: Intermediate";
  }
}

document.addEventListener("DOMContentLoaded", obtenerProbabilidadesAtributoProfesor);
document
  .querySelector("button")
  .addEventListener("click", () => determinarProfesor());