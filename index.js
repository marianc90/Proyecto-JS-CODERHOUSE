// Se requerirá al usuario seleccionar entre una serie de opciones para definir su perfil inversor y cuales son los FCI que se adecúan al mismo

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

const listaPerfiles = ["Conservador", "Moderado", "Agresivo"];
const listaFondos = [];

listaFondos.push(new FondoDeInversion("ADCAP PESOS PLUS Clase A","corto", 1000, "pesos", "48hs", "Renta Fija", 10.4625, 46, 3, "Conservador"));
listaFondos.push(new FondoDeInversion("FIMA PREMIUM Clase A", "corto", 1000, "pesos", "Inmediato", "Renta Fija", 12.1322, 35.73, 3.19, "Conservador"));
listaFondos.push(new FondoDeInversion("GALILEO AHORRO Clase A", "corto", 1000, "pesos", "24hs", "Renta Fija", 24.4339, 47.90, 4.42, "Conservador"));
listaFondos.push(new FondoDeInversion("TORONTO TRUST AHORRO Clase A", "corto", 1000, "pesos", "Inmediato", "Money Market", 7.3082, 37.23, 3.29, "Conservador"));
listaFondos.push(new FondoDeInversion("TORONTO TRUST LIQUIDEZ DÓLAR Clase A - Divisa", "corto", 1000, "dolares", "48hs", "Renta Fija", 1.0731, -0.24, -0.05, "Conservador"));

listaFondos.push(new FondoDeInversion("ADCAP BALANCEADO II Clase A", "corto", 1000, "pesos", "48hs", "Renta Fija", 2.0810, 49.04, -0.86, "Moderado"));
listaFondos.push(new FondoDeInversion("ADCAP RENTA FIJA ARGENTINA Clase A", "corto",  1000, "pesos", "48hs", "Dolar Linked", 3.4528, 32.40, 2.67, "Moderado"));
listaFondos.push(new FondoDeInversion("ADCAP RETORNO TOTAL Clase A", "corto", 1000, "pesos", "24hs", "Renta Fija", 24.4339, 47.90, 4.42, "Moderado"));
listaFondos.push(new FondoDeInversion("ALLARIA COBERTURA DINÁMICA Clase A", "mediano", 1000, "pesos", "48hs", "Renta Fija", 1.3935, 39.35, 1.3935, "Moderado"));
listaFondos.push(new FondoDeInversion("ARGENFUNDS ABIERTO PYMES Clase B", "mediano", 10000, "pesos", "48hs", "Renta Fija", 3.2272, 36.64, 2.14, "Moderado"));

listaFondos.push(new FondoDeInversion("ADCAP BALANCEADO Clase A", "largo", 500, "pesos", "48hs", "Retorno Total", 6.4304, 39.52, 2.06, "Agresivo"));
listaFondos.push(new FondoDeInversion("ALLARIA ACCIONES Clase A", "largo", 1000, "pesos", "48hs", "Renta Variable", 33.7802, 53.68, 13.41, "Agresivo"));
listaFondos.push(new FondoDeInversion("TORONTO TRUST ARGENTINA 2021 Clase A", "largo", 1000, "pesos", "48hs", "Renta Mixta", 24.4339, 1.85, 2.03, "Agresivo"));
listaFondos.push(new FondoDeInversion("BALANZ ACCIONES Clase B", "largo", 20000, "pesos", "48hs", "Renta Variable", 5.64, 13.56, 57.13, "Agresivo"));
listaFondos.push(new FondoDeInversion("CMA ACCIONES Clase A", "largo", 2000, "pesos", "48hs", "Renta Variable", 3.2251, 51.21, 10.94, "Agresivo"));

let opcionSuma = [];

/* A la siguiente funcion se la llama mediante un for, e irá recorriendo el array listaPreguntas. En base a las propiedades de cada objeto, analiza si la opcion seleccionada corresponde a las habilitadas, debiendo ser mayor a 1 y menor a la propiedad CANTIDAD de cada una de las preguntas-

El valor de cada respuesta lo irá agregando a la lista opcionSuma.*/
function sumarOpciones(nroPregunta){
    do {
        opcionSuma[nroPregunta] = parseInt(prompt(listaPreguntas[nroPregunta].pregunta));

        if (opcionSuma[nroPregunta] < 1 || opcionSuma[nroPregunta] > listaPreguntas[nroPregunta].cantidad || isNaN(opcionSuma[nroPregunta]))
            {
            alert("Debe ingresar el número de opción correspondiente");
            }
        } while (opcionSuma[nroPregunta] < 1 || opcionSuma[nroPregunta] > listaPreguntas[nroPregunta].cantidad || isNaN(opcionSuma[nroPregunta]));
}
/* La siguiente funcion suma todos los valores de la lista opcionSuma*/
function calcularResultadoFinal(suma){
    return suma.reduce((x,y) => x + y, 0);
}
/* A la siguiente funcion se le asigna como parametro el resultado obtenido de la funcion anterior para determinar el perfil al que se ajusta el usuario según el rango determinado. 
Luego le asigna a una variable el nombre de la lista del perfil correspondiente para poder mostrar sus opciones en pantalla.
Finalmente mediante un for irá recorriendo los objetos del perfil, imprimiendo cada uno de sus productos*/
function opcionesResultadoFinal(resultadoFinal){
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

    document.write(`Opciones de inversión para ${nombreUsuario} - Perfil ${perfilCalculado}: <br><br>`);
    document.write(`Se muestran ${resultadosParaMostrar.length} resultados.<br><br>`);
    
    for (const recorrerArray in resultadosParaMostrar) {

       document.write(`- ${resultadosParaMostrar[recorrerArray].nombre}<br>`);

        /* for (const recorrerObjeto in resultadosParaMostrar[recorrerArray]){
            document.write(`${recorrerObjeto}: `);
            document.write(`${JSON.stringify(resultadosParaMostrar[recorrerArray][recorrerObjeto])}`);
            document.write("<br>");
        }
        document.write("<br><br>");      */ 
    }
    document.write(`<br><br>`);

}

//FILTROS Y BUSQUEDA------------------------------------------------------------------------------------------------------------

function buscarMinimoInversion (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.inversionMinima <= valor);
    document.write(`Se muestran ${resultadosParaMostrar.length} resultados por debajo de ${valor} Pesos/Dolares de inversión mínima: <br><br>`)
    for (const recorrerArray in resultadosParaMostrar) {
        document.write(`- ${resultadosParaMostrar[recorrerArray].nombre}<br>`);
        document.write(`- Inversión minima ${resultadosParaMostrar[recorrerArray].inversionMinima} ${resultadosParaMostrar[recorrerArray].moneda}<br><br>`);
    };
};

function filtrarMayorRentabilidadAnio () {
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.map(elemento => elemento);
    resultadosParaMostrar.sort((a,b) => b.rentabilidad.ultimoAño - a.rentabilidad.ultimoAño);
    document.write(`Se muestran ${resultadosParaMostrar.length} resultados ordenados por mayor nivel de rentabilidad.<br><br>`)
    for (const recorrerArray in resultadosParaMostrar) {
        document.write(`- ${resultadosParaMostrar[recorrerArray].nombre}<br>`);
        document.write(`- Rentabilidad en el último año ${resultadosParaMostrar[recorrerArray].rentabilidad.ultimoAño}%<br><br>`);
    };
};

function filtrarMenorPlazo (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.plazo == valor);
    document.write(`Se muestran ${resultadosParaMostrar.length} resultados para inversiones de ${valor} plazo: <br><br>`)
    for (const recorrerArray in resultadosParaMostrar) {
        document.write(`- ${resultadosParaMostrar[recorrerArray].nombre}<br>`);
        document.write(`- ${resultadosParaMostrar[recorrerArray].plazo} plazo.<br><br>`);
    };

};

function buscarMoneda (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.moneda == valor);
    document.write(`Se muestran ${resultadosParaMostrar.length} resultados en ${valor}.<br><br>`)
    for (const recorrerArray in resultadosParaMostrar) {
        document.write(`- ${resultadosParaMostrar[recorrerArray].nombre}<br>`);
        document.write(`- ${resultadosParaMostrar[recorrerArray].moneda}.<br><br>`);
    };
}
// HASTA ACA LLEGA FILTROS Y BUSQUEDA------------------------------------------------------------------------------------------------

alert("TEST INICIAL DEL INVERSOR\nDescubramos que tipo de inversor sos y que productos se ajustan a tus necesidades");

do {
    nombreUsuario = prompt("Ingrese su nombre");
    if (nombreUsuario == ""){
        alert("Debe ingresar un nombre válido");
    }
} while (nombreUsuario == "");

alert(`${nombreUsuario} te plantearemos 10 situaciones en las que deberás indicar la opción que más se adecúe a tu perfil:`)

for (const recorrido in listaPreguntas){
    sumarOpciones(recorrido);
};

opcionesResultadoFinal(calcularResultadoFinal(opcionSuma));

buscarMinimoInversion (prompt("Ingrese el monto mínimo a invertir deseado: "))

filtrarMayorRentabilidadAnio();

filtrarMenorPlazo(prompt("Ingrese el plazo de la inversion deseado (Corto/Mediano/Largo").toLowerCase());

buscarMoneda(prompt("Ingrese la moneda a filtrar (pesos / dolares)").toLowerCase())

