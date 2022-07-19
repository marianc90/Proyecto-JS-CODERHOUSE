
//Creación de clase de fondos de inversion
class FondoDeInversion {
    constructor(nombre, plazo, inversionMinima, moneda, rescate, tipoRenta, valorCuotaparte, ultimoAño, ultimoMes, perfil) {
     this.nombre = nombre;
     this.plazo = plazo;
     this.inversionMinima = inversionMinima;
     this.moneda = moneda;
     this.rescate = rescate;
     this.tipoRenta = tipoRenta;
     this.valorCuotaparte = valorCuotaparte;
     this.rentabilidad = {ultimoAño: ultimoAño,
                          ultimoMes: ultimoMes};
     this.perfil = perfil;
    }
};
const listaFondos = [];
function creandoFondos(){
    //Creando objetos FONDOS DE INVERSION y agregandolos a la lista listaFondos
    //Conservador
    listaFondos.push(new FondoDeInversion("ADCAP PESOS PLUS Clase A","corto", 1000, "pesos", "48hs", "Renta Fija", 10.4625, 46, 3, "Conservador"));
    listaFondos.push(new FondoDeInversion("FIMA PREMIUM Clase A", "corto", 1000, "pesos", "Inmediato", "Renta Fija", 12.1322, 35.73, 3.19, "Conservador"));
    listaFondos.push(new FondoDeInversion("GALILEO AHORRO Clase A", "corto", 1000, "pesos", "24hs", "Renta Fija", 24.4339, 47.90, 4.42, "Conservador"));
    listaFondos.push(new FondoDeInversion("TORONTO TRUST AHORRO Clase A", "corto", 1000, "pesos", "Inmediato", "Money Market", 7.3082, 37.23, 3.29, "Conservador"));
    listaFondos.push(new FondoDeInversion("TORONTO TRUST LIQUIDEZ DÓLAR Clase A - Divisa", "corto", 1000, "dolares", "48hs", "Renta Fija", 1.0731, -0.24, -0.05, "Conservador"));
    //Moderado
    listaFondos.push(new FondoDeInversion("ADCAP BALANCEADO II Clase A", "corto", 1000, "pesos", "48hs", "Renta Fija", 2.0810, 49.04, -0.86, "Moderado"));
    listaFondos.push(new FondoDeInversion("ADCAP RENTA FIJA ARGENTINA Clase A", "corto",  1000, "pesos", "48hs", "Dolar Linked", 3.4528, 32.40, 2.67, "Moderado"));
    listaFondos.push(new FondoDeInversion("ADCAP RETORNO TOTAL Clase A", "corto", 1000, "pesos", "24hs", "Renta Fija", 24.4339, 47.90, 4.42, "Moderado"));
    listaFondos.push(new FondoDeInversion("ALLARIA COBERTURA DINÁMICA Clase A", "mediano", 1000, "pesos", "48hs", "Renta Fija", 1.3935, 39.35, 1.3935, "Moderado"));
    listaFondos.push(new FondoDeInversion("ARGENFUNDS ABIERTO PYMES Clase B", "mediano", 10000, "pesos", "48hs", "Renta Fija", 3.2272, 36.64, 2.14, "Moderado"));
    //Agresivo
    listaFondos.push(new FondoDeInversion("ADCAP BALANCEADO Clase A", "largo", 500, "pesos", "48hs", "Retorno Total", 6.4304, 39.52, 2.06, "Agresivo"));
    listaFondos.push(new FondoDeInversion("ALLARIA ACCIONES Clase A", "largo", 1000, "pesos", "48hs", "Renta Variable", 33.7802, 53.68, 13.41, "Agresivo"));
    listaFondos.push(new FondoDeInversion("TORONTO TRUST ARGENTINA 2021 Clase A", "largo", 1000, "pesos", "48hs", "Renta Mixta", 24.4339, 1.85, 2.03, "Agresivo"));
    listaFondos.push(new FondoDeInversion("BALANZ ACCIONES Clase B", "largo", 20000, "pesos", "48hs", "Renta Variable", 5.64, 13.56, 57.13, "Agresivo"));
    listaFondos.push(new FondoDeInversion("CMA ACCIONES Clase A", "largo", 2000, "pesos", "48hs", "Renta Variable", 3.2251, 51.21, 10.94, "Agresivo"));
};
creandoFondos();

//Funcion TEST DEL INVERSOR
function testInversor(){
    // Se requerirá al usuario seleccionar entre una serie de opciones para definir su perfil inversor y cuales son los FCI que se adecúan al mismo
    // Declaración de lista de preguntas
    const listaPreguntas = [
    {numero: 0,
    cantidad: 4,
    pregunta: "1 - Mi conocimiento sobre Mercado de Capitales es:\n 1) Nulo\n 2) Poco\n 3)  Mucho\n 4) Profesional"},
    {numero: 1,
    cantidad: 4,
    pregunta: "2 - He invertido en el Mercado de Capitales:\n 1) Nunca \n 2) Pocas veces y no me gustó\n 3) Mucho y ya conozco los riesgos\n 4) Siempre, lo hago habitualmente"},
    {numero: 2,
    cantidad: 4,
    pregunta: "3 - En caso de una baja en el valor de mis activos:\n 1) Rescataría todo asumiendo la pérdida \n 2) Rescataría una parte \n 3) Conservaría mis activos esperando a que suban, pese a que puedan bajar más\n 4) Aprovecharía la oportunidad y agregaría más capital"},
    {numero: 3,
    cantidad: 4,
    pregunta: "4 - El porcentaje de mis ingresos mensuales que destino a pago de deudas de préstamos, tarjetas de crédito, y demás, es:\n 1) Más del 50% \n 2) Entre un 26% y 50% \n 3) Entre el 11% y 25%\n 4) Menos del 10% "},
    {numero: 4,
    cantidad: 3,
    pregunta: "5 - Mi objetivo final es:\n 1) Mantener el valor de mi dinero con una rentabilidad mínima \n 2) Tener una ganancia superior a la de un Plazo Fijo, aunque se encuentre sujeta a variaciones del mercado \n 3) Obtener una ganancia significativa, corriendo el riesgo de perder más de la mitad de la inversión inicial"},
    {numero: 5,
    cantidad: 4,
    pregunta: "6 - Tengo a mi cargo:\n 1) Ninguna persona \n 2) 1 persona \n 3) 2 a 3 personas\n 4) Más de 3 personas "},
    {numero: 6,
    cantidad: 4,
    pregunta: "7 - La cantidad de mis ahorros que estoy dispuesto a invertir en el Mercado de Capitales es: \n 1) Menor al 25% \n 2) Entre el 26% y 50%\n 3) Entre el 51% y 75% \n 4) Más del 76%"},
    {numero: 7,
    cantidad: 4,
    pregunta: "8 - Necesitaré el dinero que invierto en:\n 1) Menos de 2 meses \n 2) En medio año \n 3) En un año \n 4) En más de un año "},
    {numero: 8,
    cantidad: 5,
    pregunta: "9 - Del total de mi dinero estoy dispuesto a asumir una pérdida de \n 1)Ninguna pérdida \n 2) Hasta un 10% \n 3) Hasta un 25%\n 4) Hasta un 50% \n 5) Más del 50%"},
    {numero: 9,
    cantidad: 3,
    pregunta: "10 - Me gustaría invertir \n 1) El total de mis Activos en Renta Fija a corto plazo (Bonos, Fonodos Comunes de Inversión, Fideiomisos Financieros) \n 2) La mitad de mis Activos en Renta Fija y el resto en ACCIONES, y demás Activos de Renta Variable \n 3) El total de mis Activos en Renta Variable "}
    ];

    /* A la siguiente funcion se la llama mediante un FOR, e irá recorriendo el array listaPreguntas. En base a las propiedades de cada objeto, analiza si la opcion seleccionada corresponde a las habilitadas (pregunta.cantidad), debiendo ser mayor a 1 y menor a preguntas.cantidad.- El valor de cada respuesta lo irá agregando a la lista opcionSuma[].*/
    function sumarOpciones(nroPregunta){
        do {
            opcionSuma[nroPregunta] = parseInt(prompt(listaPreguntas[nroPregunta].pregunta));
    
            if (opcionSuma[nroPregunta] < 1 || opcionSuma[nroPregunta] > listaPreguntas[nroPregunta].cantidad || isNaN(opcionSuma[nroPregunta]))
                {
                alert("Debe ingresar el número de opción correspondiente");
                }
            } while (opcionSuma[nroPregunta] < 1 || opcionSuma[nroPregunta] > listaPreguntas[nroPregunta].cantidad || isNaN(opcionSuma[nroPregunta]));
    };
    
    /* A la siguiente funcion se le asigna como parametro el acumulador obtenido de la funcion sumarOpciones para determinar el perfil al que se ajusta el usuario según el total de puntaje obtenido. 
    Luego le asigna a una variable el nombre de la lista del perfil correspondiente para poder mostrar sus opciones en pantalla.
    Finalmente mediante un for irá recorriendo los objetos del perfil, imprimiendo cada uno de sus productos*/
    function opcionesResultadoFinal(opcionSuma){
        const listaPerfiles = ["Conservador", "Moderado", "Agresivo"];
        let resultadoFinal = opcionSuma.reduce((x,y) => x + y, 0); /* Se le asigna a esta variable la suma todos los valores de la lista opcionSuma[]*/
        let perfilCalculado;
        let resultadosParaMostrar;
    
        if (resultadoFinal <= 13) {
            perfilCalculado = listaPerfiles[0];
            resultadosParaMostrar = listaFondos.filter(elemento => elemento.perfil == "Conservador");
    
        } else if (resultadoFinal <= 26) {
            perfilCalculado = listaPerfiles[1];
            resultadosParaMostrar = listaFondos.filter(elemento => elemento.perfil == "Moderado");
            
        } else {
            perfilCalculado = listaPerfiles[2]
            resultadosParaMostrar = listaFondos.filter(elemento => elemento.perfil == "Agresivo");
        }
    
        alert(`${nombreUsuario}, según las opciones indicadas tu perfil corresponde al Perfil ${perfilCalculado}`);
        alert(`Las opciones de inversión para el Perfil ${perfilCalculado}, son las siguientes: `);
    
        let contenedorTest = document.getElementById("contenedorTest");
    
        contenedorTest.innerHTML = `<h1>${nombreUsuario},</h1><br>Tu Perfil es <h2>${perfilCalculado}</h2> <br><br>
                                    Se muestran las ${resultadosParaMostrar.length} opciones que más se adecúan al mismo.<br><br>`;
        contenedorTest.className = "resultados";
    
        for (const recorrerArray in resultadosParaMostrar) {
        
            let fondo = document.createElement("li");
            fondo.innerHTML = `${resultadosParaMostrar[recorrerArray].nombre}<br>`
            fondo.classList.add("resultados__fondo")
            contenedorTest.append(fondo);
    
            /* for (const recorrerObjeto in resultadosParaMostrar[recorrerArray]){
                document.write(`${recorrerObjeto}: `);
                document.write(`${JSON.stringify(resultadosParaMostrar[recorrerArray][recorrerObjeto])}`);
                document.write("<br>");
            }
            document.write("<br><br>");      */ 
        }
    
    };
    // Inicio del Test
        alert("TEST INICIAL DEL INVERSOR\nDescubramos que tipo de inversor sos y que productos se ajustan a tus necesidades");
    //Solicitud de nombre correcto
        do {    
            nombreUsuario = prompt("Ingrese su nombre");
            if (nombreUsuario == ""){
                alert("Debe ingresar un nombre válido");
            }
        } while (nombreUsuario == "");
    
        alert(`${nombreUsuario} te plantearemos 10 situaciones en las que deberás indicar la opción que más se adecúe a tu perfil:`)
    //LLAMADO A LA FUNCION DE sumarOpciones MEDIANTE FOR
        let opcionSuma = []; //Acumulador de varoles elegidos para el TEST
        for (const recorrido in listaPreguntas){
            sumarOpciones(recorrido);
        };
    //LLAMADO A LA FUNCION opcionesResultadoFinal QUE MOSTRARA LOS FONDOS CUYO PERFIL COINCIDA CON EL CALCULADO PARA EL USUARIO, PASANDO COMO PARAMETRO LA FUNCION calcularResultadoFinal QUE SE ENCARGA DE SUMAR TODOS LOS VALORES DE opcionSuma[].
        opcionesResultadoFinal(opcionSuma);
    
};

//FILTROS Y BUSQUEDA------------------------------------------------------------------------------------------------------------
function buscarMinimoInversion (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.inversionMinima <= valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `Se muestran ${resultadosParaMostrar.length} resultados por debajo de ${valor} Pesos/Dolares de inversión mínima: <br><br>`;
    for (const recorrerArray in resultadosParaMostrar) {
        let li = document.createElement("li");
        li.innerHTML = `${resultadosParaMostrar[recorrerArray].nombre}<br>
                        - Inversión minima ${resultadosParaMostrar[recorrerArray].inversionMinima} ${resultadosParaMostrar[recorrerArray].moneda}<br><br>`;
        cuerpoFCI.append(li);
        };
};
function filtrarMayorRentabilidadAnio () {
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.map(elemento => elemento);
    resultadosParaMostrar.sort((a,b) => b.rentabilidad.ultimoAño - a.rentabilidad.ultimoAño);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `Se muestran ${resultadosParaMostrar.length} resultados ordenados por mayor nivel de rentabilidad.<br><br>`;
    for (const recorrerArray in resultadosParaMostrar) {
        let li = document.createElement("li");
        li.innerHTML = `- ${resultadosParaMostrar[recorrerArray].nombre}<br>
                        - Rentabilidad en el último año ${resultadosParaMostrar[recorrerArray].rentabilidad.ultimoAño}%<br><br>`;
        cuerpoFCI.append(li);
    };
};
function filtrarMenorPlazo (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.plazo == valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `Se muestran ${resultadosParaMostrar.length} resultados para inversiones de ${valor} plazo: <br><br>`;
    for (const recorrerArray in resultadosParaMostrar) {
        let li = document.createElement("li");
        li.innerHTML = `- ${resultadosParaMostrar[recorrerArray].nombre}<br>
                        - ${resultadosParaMostrar[recorrerArray].plazo} plazo.<br><br>`;
        cuerpoFCI.append(li);
    };

};
function buscarMoneda (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.moneda == valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `Se muestran ${resultadosParaMostrar.length} resultados en ${valor}.<br><br>`;
    for (const recorrerArray in resultadosParaMostrar) {
        let li = document.createElement("li");
        li.innerHTML = `- ${resultadosParaMostrar[recorrerArray].nombre}<br>
                        - ${resultadosParaMostrar[recorrerArray].moneda}.<br><br>`;
        cuerpoFCI.append(li);                 
    };
}
// HASTA ACA LLEGA FILTROS Y BUSQUEDA------------------------------------------------------------------------------------------------

//TEST INVERSOR BOTON

let botonTest = document.getElementById('btnTest');
botonTest.addEventListener("click", testInversor);


//MOSTRAR LISTA FONDOS SIN FILTRO

function mostrarTodoFondos () {
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.map(elemento => elemento);
    resultadosParaMostrar.sort((a,b) => a.nombre - b.nombre);

    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = (`<H1>LISTA COMPLETA DE FONDOS</H1>
                            Se muestran ${resultadosParaMostrar.length} resultados en total.<br><br>`);
    for (const recorrerArray in resultadosParaMostrar) {
        let li = document.createElement("li");
        li.innerHTML = `${resultadosParaMostrar[recorrerArray].nombre}<br><br>`; 
       cuerpoFCI.append(li);
        };
};

mostrarTodoFondos();

//BOTON FILTROS

let botonFilterMinimoInv = document.getElementById('btnFilterMinimoInv');
botonFilterMinimoInv.addEventListener("click", () => buscarMinimoInversion(prompt("Ingrese el monto mínimo a invertir deseado: 500/1000/2000")));

let botonFilterMayorRenta = document.getElementById('btnFilterMayorRenta');
botonFilterMayorRenta.addEventListener("click", filtrarMayorRentabilidadAnio);

let botonFilterPlazo = document.getElementById('btnFilterPlazo');
botonFilterPlazo.addEventListener("click", () => filtrarMenorPlazo(prompt("Ingrese el plazo de la inversion deseado (Corto/Mediano/Largo").toLowerCase()));

let botonFilterMoneda = document.getElementById('btnFilterMoneda');
botonFilterMoneda.addEventListener("click", () => buscarMoneda(prompt("Ingrese la moneda a filtrar (pesos / dolares)").toLowerCase()));

