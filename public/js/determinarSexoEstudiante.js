//Esta porción del código se encarga de guardar en la base de datos las probabilidades
//NOTA: Se utilizó una sola vez llamandolo en el eventListener del DOMContentLoaded
//NOTA2: 
//--------------------------------------------------------------------------------------------//

//Arreglo donde se guardan las frecuencias para sacar las probabilidades de los atributos con 
//respecto a las clases
let frecuenciaEstudianteSexo = [];

//Método que extrae de la base de datos los registros relacionados y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerFrecuenciaSexo = async () => {
  try {
    let res = await fetch(
        "?controlador=SexoEstudiante&accion=obtenerFrecuenciaSexo"
      ),
      json = await res.json();
      console.log(json);
    if (!res.ok) throw { status: res.status, message: res.statusText };
    frecuenciaEstudianteSexo = json;
    guardarProbabilidesSexo(generarProbabilidadesSexo());
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    // console.log(`Error ${err.status}: ${message}`);
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
};

//Método que guarda en la base de datos las probabilidades obtenidas con las frecuencias
const guardarProbabilidesSexo= async (probabilidades)=>{
  try {
    let res = await fetch("?controlador=SexoEstudiante&accion=generarProbabilidaesAtributoSexo", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(probabilidades)
    });
    let json = await res.json();
    if (!res.ok) throw { status: res.status, message: res.statusText };
    console.log(json);
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    // console.log(`Error ${err.status}: ${message}`);
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
}

//Método que genera las probabilides en base a las frecuencias extraidas de la base de datos
const generarProbabilidadesSexo=()=>{
   //se declaran algunas variables necesarias para generar la formula (nc + m*p)/(n + m)
    let nc=0, m=3, p=0, estiloP=1/4, n=0, promedioP=1/4, recintoP=1/2 ;
  
  //Se declaran la cantidad de elementos por clase que existen en el set de datos
  //NOTA: al ser un trabajo estatico sin actualizar nada, se quemaron
  const claseF=13, claseM=64;

   //Arreglo donde se guaradarán las probabilidaes 
  const probabilidades = [];
  /*Se recorre el array para poder guardar las frecuencias y el n de cada registro */
  frecuenciaEstudianteSexo.forEach((el,i)=>{
    if (el.atributo === "estilo" && el.clase === "F") {
      nc = el.frecuencia;
      p = estiloP;
      n = claseF;
    } else if (el.atributo === "estilo" && el.clase === "M") {
      nc = el.frecuencia;
      p = estiloP;
      n = claseM;
    } else if (el.atributo === "promedio" && el.clase === "F") {
      nc = el.frecuencia;
      p = promedioP;
      n = claseF;
    } else if (el.atributo === "promedio" && el.clase === "M") {
      nc = el.frecuencia;
      p = promedioP;
      n = claseM;
    } else if (el.atributo === "recinto" && el.clase === "F") {
      nc = el.frecuencia;
      p = recintoP;
      n = claseF;
    } else if (el.atributo === "recinto" && el.clase === "M") {
      nc = el.frecuencia;
      p = recintoP;
      n = claseM;
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
};
//--------------------------------------------------------------------------------------------------------//
//Arreglos para guardar las probabilidades para generar las respuestas usando Bayes
let probabilidadesAtributos = [];
let probabilidadesClase = [];

//Método que permite obtener las probabiliades de las clases y las probabilidaes de los atributos
//NOTA: Este método se llama por defecto en el DOMContentLoaded
const obtenerProbabilidadesAtributoSexo = async () => {
  let res1 = await fetch(
        "?controlador=SexoEstudiante&accion=obtenerProbabilidaesAtributoSexo"
      ), res2 = await fetch(
        "?controlador=SexoEstudiante&accion=obtenerProbabilidaesClaseSexo");
      
    if (!res1.ok) throw { status: res1.status, message: res1.statusText };
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
    determinarSexo();    
  }

}

const determinarSexo = () =>{
  //Se declaran variables para guardar los resultados de los atributos para cada clase
  let estiloF=0, promedioF=0, recintoF=0;
  let estiloM=0, promedioM=0, recintoM=0;
  
  /*Se recorre el array donde se tienen guardadas las probabilidades, se evalua el atributo y el valor 
  con el ingresado por el usuario para asi poder encontrar en el array la probabilidad correcta de 
  cada atributo*/

  probabilidadesAtributos.forEach((el)=>{
    if (el.atributo==="estilo" && el.valor==document.getElementById("estilo").value.toUpperCase()){
      el.clase=="F"? estiloF=el.probabilidad : estiloM=el.probabilidad;
    }
    if (el.atributo==="promedio" && el.valor==parseFloat(document.getElementById("promedio").value).toFixed(1)){
      el.clase == "F" ? promedioF=el.probabilidad : promedioM=el.probabilidad;
    }
    if (el.atributo==="recinto" && el.valor==document.getElementById("recinto").value){
      el.clase == "F"? recintoF=el.probabilidad: recintoM=el.probabilidad;    			
    }    		
  })
  
  /*Primero se realizan las multiplicacion de las probabilidades de cada atributo para cada clase*/
  let F = estiloF*promedioF*recintoF;
  let M = estiloM*promedioM*recintoM;;

  /*Se recorre el array donde se tiene guardado las probabilidades de cada clase y se realiza la multiplicacion
    para sacar la probabilidad total de cada clase y se guarda en una variable*/
    probabilidadesClase.forEach((el)=>{
     if (el.clase==="F"){
       F=F*el.probabilidad;
     }else{
       M=M*el.probabilidad;
     }
   })

  /*Con las probabilidades obtenidas, se revisa cual es la mayor y se le aclara al usuario en la
    vista donde ingresó la información*/
   document.getElementById("resultado").innerHTML =
    "Sexo del estudiante: " +
    (M>F ? "Masculino" : "Femenino");
}



document.addEventListener("DOMContentLoaded", obtenerProbabilidadesAtributoSexo);
document
  .querySelector("button")
  .addEventListener("click", () => validarForm());

