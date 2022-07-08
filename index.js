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
const listaPerfiles = ["Conservador", "Moderado", "Agresivo"];
const Conservador = [
    {nombre: "ADCAP PESOS PLUS Clase A",
     plazo: "Corto Plazo",
     inversionMinima: 1000,
     moneda: "Pesos",
     rescate: "48hs",
     tipoRenta: "Renta Fija",
     valorCuotaparte: 10.4625,
     rentabilidad: {ultimoAño: "46%",
                    ultimoMes: "3%",
                    } },
    
    {nombre: "FIMA PREMIUM Clase A",
    plazo: "Muy Corto Plazo",
    inversionMinima: 1000,
    moneda: "Pesos",
    rescate: "Inmediato",
    tipoRenta: "Renta Fija",
    valorCuotaparte: 12.1322,
    rentabilidad: {ultimoAño: "35.73%",
                   ultimoMes: "3.19%",
                   } },
    {nombre: "GALILEO AHORRO Clase A",
    plazo: "Muy Corto Plazo",
    inversionMinima: 1000,
    moneda: "Pesos",
    rescate: "24hs",
    tipoRenta: "Renta Fija",
    valorCuotaparte: 24.4339,
    rentabilidad: {ultimoAño: "47.90%",
                   ultimoMes: "4.42%",
                   } },
    {nombre: "TORONTO TRUST AHORRO Clase A",
    plazo: "Corto Plazo",
    inversionMinima: 1000,
    moneda: "Pesos",
    rescate: "Inmediato",
    tipoRenta: "Money Market",
    valorCuotaparte: 7.3082,
    rentabilidad: {ultimoAño: "37.23%",
                   ultimoMes: "3.29%",
                   } },
    {nombre: "TORONTO TRUST LIQUIDEZ DÓLAR Clase A - Divisa",
    plazo: "Corto Plazo",
    inversionMinima: 1000,
    moneda: "Dólares",
    rescate: "48hs",
    tipoRenta: "Renta Fija",
    valorCuotaparte: 1.0731,
    rentabilidad: {ultimoAño: "-0.24%",
                   ultimoMes: "-.05%",
                   } },];

const Moderado = [
    {nombre: "DCAP BALANCEADO II Clase A",
    plazo: "Corto Plazo",
    inversionMinima: 1000,
    moneda: "Pesos",
    rescate: "48hs",
    tipoRenta: "Renta Fija",
    valorCuotaparte: 2.0810,
    rentabilidad: {ultimoAño: "49.04%",
                   ultimoMes: "-0.86%",
                   } },
   
   {nombre: "ADCAP RENTA FIJA ARGENTINA Clase A",
   plazo: "Corto Plazo",
   inversionMinima: 1000,
   moneda: "Pesos",
   rescate: "48hs",
   tipoRenta: "Dolar Linked",
   valorCuotaparte: 3.4528,
   rentabilidad: {ultimoAño: "32.40%",
                  ultimoMes: "2.67%",
                  } },
   {nombre: "ADCAP RETORNO TOTAL Clase A",
   plazo: "Corto Plazo",
   inversionMinima: 1000,
   moneda: "Pesos",
   rescate: "24hs",
   tipoRenta: "Renta Fija",
   valorCuotaparte: 24.4339,
   rentabilidad: {ultimoAño: "47.90%",
                  ultimoMes: "4.42%",
                  } },
   {nombre: "ALLARIA COBERTURA DINÁMICA Clase A",
   plazo: "Mediano Plazo",
   inversionMinima: 1000,
   moneda: "Pesos",
   rescate: "48hs",
   tipoRenta: "Renta Fija",
   valorCuotaparte: 1.3935,
   rentabilidad: {ultimoAño: "39.35%",
                  ultimoMes: "1.3935%",
                  } },
   {nombre: "ARGENFUNDS ABIERTO PYMES Clase B",
   plazo: "Mediano Plazo",
   inversionMinima: 10000,
   moneda: "Pesos",
   rescate: "48hs",
   tipoRenta: "Renta Fija",
   valorCuotaparte: 3.2272,
   rentabilidad: {ultimoAño: "36.64%",
                  ultimoMes: "2.14%",
                  } },];
const Agresivo = [
    {nombre: "ADCAP BALANCEADO Clase A",
    plazo: "Mediano/Largo",
    inversionMinima: 500,
    moneda: "Pesos",
    rescate: "48hs",
    tipoRenta: "Retorno Total",
    valorCuotaparte: 6.4304,
    rentabilidad: {ultimoAño: "39.52%",
                   ultimoMes: "2.06%",
                   } },
   
   {nombre: "ALLARIA ACCIONES Clase A",
   plazo: "Largo Plazo",
   inversionMinima: 1000,
   moneda: "Pesos",
   rescate: "48hs",
   tipoRenta: "Renta Variable",
   valorCuotaparte: 33.7802,
   rentabilidad: {ultimoAño: "53.68%",
                  ultimoMes: "13.41%",
                  } },
   {nombre: "TORONTO TRUST ARGENTINA 2021 Clase A",
   plazo: "Mediano/Largo Plazo",
   inversionMinima: 1000,
   moneda: "Pesos",
   rescate: "48hs",
   tipoRenta: "Renta Mixta",
   valorCuotaparte: 24.4339,
   rentabilidad: {ultimoAño: "1.85%",
                  ultimoMes: "2.03%",
                  } },
   {nombre: "BALANZ ACCIONES Clase B",
   plazo: "Largo Plazo",
   inversionMinima: 20000,
   moneda: "Pesos",
   rescate: "48hs",
   tipoRenta: "Renta Variable",
   valorCuotaparte: 5.64,
   rentabilidad: {ultimoAño: "13.56%",
                  ultimoMes: "57.13%",
                  } },
   {nombre: "CMA ACCIONES Clase A",
   plazo: "Largo Plazo",
   inversionMinima: 10000,
   moneda: "Pesos",
   rescate: "48hs",
   tipoRenta: "Renta Variable",
   valorCuotaparte: 3.2251,
   rentabilidad: {ultimoAño: "51.21%",
                  ultimoMes: "10.94%",
                  } },];

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
        resultadosParaMostrar = Conservador;

    } else if (resultadoFinal <= 26) {
        perfilCalculado = listaPerfiles[1];
        resultadosParaMostrar = Moderado;
        
    } else {
        perfilCalculado = listaPerfiles[2]
        resultadosParaMostrar = Agresivo;
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

}

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































/* opcion[0] = parseInt(prompt("1 - Mi conocimiento sobre Mercado de Capitales es:\n 1) Nulo\n 2) Poco\n 3)  Mucho\n 4) Profesional"));

opcion[1] = parseInt(prompt("2 - He invertido en el Mercado de Capitales:\n 1) Nunca \n 2) Pocas veces y no me gustó\n 3) Mucho y ya conozco los riesgos\n 4) Siempre, lo hago habitualmente "));

opcion[2] = parseInt(prompt("3 - En caso de una baja en el valor de mis activos:\n 1) Rescataría todo asumiendo la pérdida \n 2) Rescataría una parte \n 3) Conservaría mis activos esperando a que suban, pese a que puedan bajar más\n 4) Aprovecharía la oportunidad y agregaría más capital "));

opcion4 = parseInt(prompt("4 - El porcentaje de mis ingresos mensuales que destino a pago de deudas de préstamos, tarjetas de crédito, y demás, es:\n 1) Más del 50% \n 2) Entre un 26% y 50% \n 3) Entre el 11% y 25%\n 4) Menos del 10% "));

opcion5 = parseInt(prompt("5 - Mi objetivo final es:\n 1) Mantener el valor de mi dinero con una rentabilidad mínima \n 2) Tener una ganancia superior a la de un Plazo Fijo, aunque se encuentre sujeta a variaciones del mercado \n 3) Obtener una ganancia significativa, corriendo el riesgo de perder más de la mitad de la inversión inicial"));

opcion6 = parseInt(prompt("6 - Tengo a mi cargo:\n 1) Ninguna persona \n 2) 1 persona \n 3) 2 a 3 personas\n 4) Más de 3 personas "));

opcion7 = parseInt(prompt("7 - La cantidad de mis ahorros que estoy dispuesto a invertir en el Mercado de Capitales es: \n 1) Menor al 25% \n 2) Entre el 26% y 50%\n 3) Entre el 51% y 75% \n 4) Más del 76%"));

opcion8 = parseInt(prompt("8 - Necesitaré el dinero que invierto en:\n 1) Menos de 2 meses \n 2) En medio año \n 3) En un año \n 4) En más de un año "));

opcion9 = parseInt(prompt("9 - Del total de mi dinero estoy dispuesto a asumir una pérdida de \n 1)Ninguna pérdida \n 2) Hasta un 10% \n 3) Hasta un 25%\n 4) Hasta un 50% \n 5) Más del 50%"));

opcion10 = parseInt(prompt("10 - Me gustaría invertir \n 1) El total de mis Activos en Renta Fija a corto plazo (Bonos, Fonodos Comunes de Inversión, Fideiomisos Financieros) \n 2) La mitad de mis Activos en Renta Fija y el resto en ACCIONES, y demás Activos de Renta Variable \n 3) El total de mis Activos en Renta Variable ")); */

