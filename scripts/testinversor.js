import { listaFondos } from "../scripts/index.js";
import { sesion } from "../scripts/session.js"


// Declaración de lista de preguntas que luego se renderizaran en el formulario
const listaPreguntas = [
    {numero: 0,
    cantidad: 4,
    pregunta: "1 - Mi conocimiento sobre Mercado de Capitales es:",
    respuestas: ["1) Nulo", "2) Poco", "3) Mucho","4) Profesional"]},
    {numero: 1,
    cantidad: 4,
    pregunta: "2 - He invertido en el Mercado de Capitales:",
    respuestas: ["1) Nunca", "2) Pocas veces y no me gustó", "3) Mucho y ya conozco los riesgos", "4) Siempre, lo hago habitualmente"]},
    {numero: 2,
    cantidad: 4,
    pregunta: "3 - En caso de una baja en el valor de mis activos:",
    respuestas: ["1) Rescataría todo asumiendo la pérdida", "2) Rescataría una parte", "3) Conservaría mis activos esperando a que suban, pese a que puedan bajar más", "4) Aprovecharía la oportunidad y agregaría más capital"]},
    {numero: 3,
    cantidad: 4,
    pregunta: "4 - El porcentaje de mis ingresos mensuales que destino a pago de deudas de préstamos, tarjetas de crédito, y demás, es:",
    respuestas: ["1) Más del 50%", "2) Entre un 26% y 50%", "3) Entre el 11% y 25%", "4) Menos del 10%"]},
    {numero: 4,
    cantidad: 3,
    pregunta: "5 - Mi objetivo final es:",
    respuestas: ["1) Mantener el valor de mi dinero con una rentabilidad mínima", " 2) Tener una ganancia superior a la de un Plazo Fijo, aunque se encuentre sujeta a variaciones del mercado", "3) Obtener una ganancia significativa, corriendo el riesgo de perder más de la mitad de la inversión inicial"]},
    {numero: 5,
    cantidad: 4,
    pregunta: "6 - Tengo a mi cargo:",
    respuestas: ["1) Mas de 3 personas", "2) 2 a 3 personas", "3) 1 persona", "4) Ninguna persona"]},
    {numero: 6,
    cantidad: 4,
    pregunta: "7 - La cantidad de mis ahorros que estoy dispuesto a invertir en el Mercado de Capitales es:",
    respuestas: ["1) Menor al 25%", "2) Entre el 26% y 50%", "3) Entre el 51% y 75%", "4) Más del 76%"]},
    {numero: 7,
    cantidad: 4,
    pregunta: "8 - Necesitaré el dinero que invierto en:",
    respuestas: ["1) Menos de 2 meses", "2) En medio año", "3) En un año", "4) En más de un año"]},
    {numero: 8,
    cantidad: 5,
    pregunta: "9 - Del total de mi dinero estoy dispuesto a asumir una pérdida de:",
    respuestas: ["1)Ninguna pérdida", "2) Hasta un 10%", "3) Hasta un 25%", "4) Hasta un 50%", "5) Más del 50%"]},
    {numero: 9,
    cantidad: 3,
    pregunta: "10 - Me gustaría invertir:",
    respuestas: ["1) El total de mis Activos en Renta Fija a corto plazo (Bonos, Fonodos Comunes de Inversión, Fideiomisos Financieros)", "2) La mitad de mis Activos en Renta Fija y el resto en ACCIONES, y demás Activos de Renta Variable", "3) El total de mis Activos en Renta Variable"]},
    ];

//TEST INVERSOR BOTON
let botonTest = document.getElementById('btnTest');
    botonTest.addEventListener("click", testInversor);
//
let formularioContenedor = document.getElementById('form_test');
let opcionSuma = []; //Acumulador de valores elegidos para el TEST

// Se requerirá al usuario seleccionar entre una serie de opciones para definir su perfil inversor y cuales son los FCI que se adecúan al mismo
/* A la siguiente funcion se la llama mediante un FOR, e irá recorriendo el array listaPreguntas e imprimiendolos en el contenedor formularioContenedor. En base a las propiedades de cada objeto- El valor de cada respuesta lo irá agregando a la lista opcionSuma[].*/
function imprimirOpciones(nroPregunta){
    let pregunta = document.createElement('div');
    pregunta.innerHTML += `<br><h2 id='pregunta${nroPregunta}'>${listaPreguntas[nroPregunta].pregunta}</h2><br>`;
    let i = 1;
    for (const respuesta in listaPreguntas[nroPregunta].respuestas) {
        pregunta.innerHTML += `<input type="radio" name="respuesta${nroPregunta}" id="respuesta${nroPregunta}_opcion${i}" value="${i}" required> ${listaPreguntas[nroPregunta].respuestas[respuesta]}<br>`;
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

    let mensaje = `${sesion.usuario}, según las opciones indicadas tu perfil corresponde al Perfil ${perfilCalculado}\n
    Las opciones de inversión para el Perfil ${perfilCalculado}, son las siguientes: `;
    alert(mensaje);     
    
    opcionesResultadoFinal(perfilCalculado); //LLAMADO A LA FUNCION opcionesResultadoFinal QUE MOSTRARA LOS FONDOS CUYO PERFIL COINCIDA CON EL CALCULADO PARA EL USUARIO.

    let header = document.getElementById('cabecera');
    header.scrollIntoView();
};

 //La siguiente funcion imprime cada uno de los resultados en funcion del perfil que se le asigna como argumento
function opcionesResultadoFinal(perfilCalculado){
    let resultadosParaMostrar = listaFondos.filter(elemento => elemento.perfil == perfilCalculado); //FILTRAMOS POR PERFIL y GUARDAMOS EN ARRAY
    
    let cuerpoFCI = document.getElementById("contenedorTest");
    cuerpoFCI.innerHTML = `<h1>${sesion.usuario},</h1><br>Tu Perfil es <h2>${perfilCalculado}</h2> <br><br>
                                Se muestran las ${resultadosParaMostrar.length} opciones que más se adecúan al mismo.<br><br>`;
    cuerpoFCI.className = "resultados";

    for (const recorrerArray in resultadosParaMostrar) {
        let li = document.createElement("li");
        li.innerHTML = `<span id="enlace_${resultadosParaMostrar[recorrerArray].id}">${resultadosParaMostrar[recorrerArray].nombre}</span><br><br>`; 
        li.classList.add('lista_fci');
        cuerpoFCI.append(li);
        let botonMostrar = document.getElementById(`enlace_${resultadosParaMostrar[recorrerArray].id}`);//llamamos al span y lo guardamos en botonMostrar
        let modal = document.getElementById('modal_fci');//llamamos a al modal oculto
        
        botonMostrar.addEventListener("click", () => {
        modal.className = 'modal_fci';//hacemos al modal visible mediante modificacion de la clase
        modal.innerHTML = '';//lo limpieamos para que no se sobreescriba
        modal.innerHTML = `<div class='modal_fci_titulo'><h1>${resultadosParaMostrar[recorrerArray].nombre}</h1></div>
                       <div class='modal_fci_contenido'> 
                                     <p>Plazo de permanencia sugerido: <b>${(resultadosParaMostrar[recorrerArray].plazo).toUpperCase()}</b></p>
                                    <p>Monto minimo de inversion: <b>$${resultadosParaMostrar[recorrerArray].inversionMinima} ${(resultadosParaMostrar[recorrerArray].moneda).toUpperCase()}</b></p>
                                    <p>Tiempo de rescate: <b>${resultadosParaMostrar[recorrerArray].rescate}</b></p>
                                    <p>Tipo de Renta: <b>${resultadosParaMostrar[recorrerArray].tipoRenta}</b></p>
                                    <p>Valor de la cuotaparte: <b>${resultadosParaMostrar[recorrerArray].valorCuotaparte}</b></p>
                                    <br>
                                                             <center><b>RENTABILIDAD</b><p> Ultimo año: <b id='renta-anio'>%${resultadosParaMostrar[recorrerArray].rentabilidad.ultimoAño}</b>
                                                                             Ultimo mes: <b id='renta-mes'>%${resultadosParaMostrar[recorrerArray].rentabilidad.ultimoMes}</b></p></center>
                                                             <center><b><p>PERFIL ${resultadosParaMostrar[recorrerArray].perfil}</b></p></center>
            
                            </div>
                            <div class="modal_fci_botones" id="modal_fci_botones">
                            <div class="modal_fci_suscribir" id="modal_fci_suscribir">SUSCRIBIR </div>
                            <div class="modal_fci_cerrar" id="modal_fci_cerrar">CERRAR </div>
                            </div>`
        // ASIGNACION DE COLOR SEGUN SI RENTABILIDAD ES POSITIVA O NEGATIVA
        let rentaAnio = document.getElementById('renta-anio');
        let rentaMes = document.getElementById('renta-mes');
        resultadosParaMostrar[recorrerArray].rentabilidad.ultimoAño > 0 ? rentaAnio.className = 'verde' : rentaAnio.className = 'rojo';
        resultadosParaMostrar[recorrerArray].rentabilidad.ultimoMes > 0 ? rentaMes.className = 'verde' : rentaMes.className = 'rojo';
        //creacion del boton cerrar
        let botonCerrar = document.getElementById('modal_fci_cerrar')
        botonCerrar.addEventListener('click', () => {
            modal.className = 'modal_fci_oculto'; 
            modal.innerHTML = '';});
    });
    };
    formularioContenedor.innerHTML = '';
};

//Funcion TEST DEL INVERSOR
function testInversor(){
 // Si el valor importado de sesion es null, se requerira incio de sesion
    if (sesion == null) {
        return alert('Debe iniciar sesion antes de continuar');
    };

    // Inicio del Test
        alert("TEST INICIAL DEL INVERSOR\nDescubramos que tipo de inversor sos y que productos se ajustan a tus necesidades");
        alert(`${sesion.usuario} te plantearemos 10 situaciones en las que deberás indicar la opción que más se adecúe a tu perfil:`);
    //LLAMADO A LA FUNCION DE imprimirOpciones MEDIANTE FOR
        formularioContenedor.scrollIntoView();
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
// SI EL USUARIO ESTA REGISTRADO Y COMPLETO EL TEST, SE IMPRIMIRAN LOS RESULTADOS AUTOMATICAMENTE
if (sesion.perfil != "") {
    opcionesResultadoFinal(sesion.perfil);
    botonTest.remove();
};
