import { importarFondos } from "../scripts/index.js";
import { sesion } from "../scripts/session.js"; 
import { imprimirFondos } from "../scripts/imprimirfondos.js";

// Declaración de lista de preguntas que luego se renderizaran en el formulario
const listaPreguntas = [];

let listaFondos;

//TEST INVERSOR BOTON
let botonTest = document.getElementById('btnTest');
    botonTest.addEventListener("click", testInversor);
//
let formularioContenedor = document.getElementById('form_test');
let opcionSuma = []; //Acumulador de valores elegidos para el TEST

document.addEventListener('DOMContentLoaded', e => {
    importarPreguntas();
    awaitFetch();

})

async function importarPreguntas (){
    const response = await fetch("../scripts/listaPreguntas.json");
    const data = await response.json();

    for (let pregunta of data){
        listaPreguntas.push(pregunta);
    }

    return listaPreguntas;
}

async function awaitFetch(){
    listaFondos = await importarFondos();

    // SI EL USUARIO ESTA REGISTRADO Y COMPLETO EL TEST, SE IMPRIMIRAN LOS RESULTADOS AUTOMATICAMENTE
    if (sesion != null && sesion.perfil != "") {
        opcionesResultadoFinal(sesion.perfil);
        botonTest.remove();
    };
};
// Se requerirá al usuario seleccionar entre una serie de opciones para definir su perfil inversor y cuales son los FCI que se adecúan al mismo
/* A la siguiente funcion se la llama mediante un FOR, e irá recorriendo el array listaPreguntas e imprimiendolos en el contenedor formularioContenedor. En base a las propiedades de cada objeto- El valor de cada respuesta lo irá agregando a la lista opcionSuma[].*/
function imprimirOpciones(nroPregunta){
    let pregunta = document.createElement('div');
    pregunta.innerHTML += `<br><h2 id='pregunta${nroPregunta}'>${listaPreguntas[nroPregunta].pregunta}</h2><br>`;
    let i = 1;
    for (const respuesta in listaPreguntas[nroPregunta].respuestas) {
        pregunta.innerHTML += `<input type="radio" name="respuesta${nroPregunta}" id="respuesta${nroPregunta}_opcion${i}" value="${i}" required> <label for="respuesta${nroPregunta}_opcion${i}">${listaPreguntas[nroPregunta].respuestas[respuesta]}</label><br>`;
        i++;
    }
    formularioContenedor.appendChild(pregunta);
};

/* La siguiente funcion suma los valores de los values inputs radio para determinar el perfil al que se ajusta el usuario según el total de puntaje obtenido. */
function calcularValoresIngresados(e){
    e.preventDefault();
                                                                                                                    /* [0].children.respuesta0_opcion1.checked / [0].children.respuesta0_opcion1.value ----> [9].children.respuesta9_opcion3.checked / [9].children.respuesta9_opcion3.value */
    for (let i = 0; i < 39; i++){
        if (e.target.children[11].form[i].checked){
            opcionSuma.push(parseInt(e.target.children[11].form[i].value));
        }
    };

    let resultadoFinal = opcionSuma.reduce((x,y) => x + y, 0); /* Se asigna a esta variable la suma todos los valores de la lista opcionSuma[]*/
    const listaPerfiles = ["Conservador", "Moderado", "Agresivo"];
    let perfilCalculado = '';
    //SE CALCULA EL PERFIL EN BASE AL RESULTADO DE LA SUMA
    (resultadoFinal <= 13) ? (perfilCalculado = listaPerfiles[0]) : (resultadoFinal <= 26) ? (perfilCalculado = listaPerfiles[1]) : (perfilCalculado = listaPerfiles[2]); // Dependiendo el valor acumulado en resultadoFinal se asginara un perfilCalculado para poder filtrarlo segun las propiedades de cada cada fondo
    
    //SE MODIFICA EL VALOR DE LA PROPIEDAD PERFIL EN LA VARIABLE
    sesion.perfil = perfilCalculado;

    //SE MODIFICAN LOS VALORES DE LA PROPIEDAD PERFIL DEL USUARIO EN EL LOCALSTORAGE
    let cuentasAModificar = JSON.parse(localStorage.getItem('cuentas'));
    cuentasAModificar.find(elemento => elemento.usuario == sesion.usuario).perfil = perfilCalculado;
    localStorage.setItem('cuentas', JSON.stringify(cuentasAModificar));
    
    //SE MODIFICAN LOS VALORES DE LA PROPIEDAD PERFIL DEL USUARIO EN EL SESSIONSTORAGE
    let sesionAModificar = JSON.parse(sessionStorage.getItem('sesion'));
    sesionAModificar.perfil = perfilCalculado;
    sessionStorage.setItem('sesion', JSON.stringify(sesionAModificar));

    Swal.fire(
        `Perfil ${perfilCalculado}`,
        `${sesion.usuario}, las opciones de inversión para el Perfil ${perfilCalculado}, son las siguientes:`,
        'success'
    );      
    
    opcionesResultadoFinal(perfilCalculado); //LLAMADO A LA FUNCION opcionesResultadoFinal QUE MOSTRARA LOS FONDOS CUYO PERFIL COINCIDA CON EL CALCULADO PARA EL USUARIO.

    let header = document.getElementById('cabecera');
    header.scrollIntoView();
};

 //La siguiente funcion imprime cada uno de los resultados en funcion del perfil que se le asigna como argumento
function opcionesResultadoFinal(perfilCalculado){
    let resultadosParaMostrar = listaFondos.filter(elemento => elemento.perfil == perfilCalculado); //FILTRAMOS POR PERFIL y GUARDAMOS EN ARRAY
    
    let cuerpoFCI = document.getElementById("contenedorTest");
    cuerpoFCI.innerHTML = `<h1>${sesion.usuario}</h1><br><h2>Perfil ${perfilCalculado}</h2> <br><br>
                                Se muestran las ${resultadosParaMostrar.length} opciones que más se adecúan al mismo.<br><br>`;
    cuerpoFCI.className = "resultados";
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    formularioContenedor.innerHTML = '';
};

//Funcion TEST DEL INVERSOR
function testInversor(){
 // Si el valor importado de sesion es null, se requerira incio de sesion
    if (sesion == null) {
        
        return Swal.fire(
            `Debe identificarse`,
            `Para iniciar el test, debe estar registrado y logueado en el sistema.`,
            'error'
        );  
    };

// Inicio del Test
    Swal.fire(
        `TEST INICIAL DEL INVERSOR`,
        `${sesion.usuario}, descubramos que tipo de inversor sos y que productos se ajustan a tus necesidades.`,
        'info'
    );    
//LLAMADO A LA FUNCION DE imprimirOpciones MEDIANTE FOR
    formularioContenedor.scrollIntoView({block: 'start'});
    formularioContenedor.innerHTML = '<button id="boton_calcular" type="submit" class="none"></button>';
    for (const recorrido in listaPreguntas){
        imprimirOpciones(recorrido);
    };
    botonTest.remove();
//Se llama al boton de submit para bajarlo luego de la impresion de opciones y darle estilos y visibilidad.
    formularioContenedor.innerHTML += '<br>';
    let botonCalcular = document.getElementById('boton_calcular');
    botonCalcular.innerHTML = `Calcular`;
    botonCalcular.className = 'btnEstandar';
    formularioContenedor.appendChild(botonCalcular);
    formularioContenedor.addEventListener('submit', calcularValoresIngresados);
};
