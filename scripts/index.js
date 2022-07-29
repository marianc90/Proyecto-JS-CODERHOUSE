//Creación de clase de fondos de inversion
class FondoDeInversion {
    constructor(nombre, plazo, inversionMinima, moneda, rescate, tipoRenta, valorCuotaparte, ultimoAño, ultimoMes, perfil, longitud) {
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
     this.id = longitud.length + 1;
    }
};
const listaFondos = [];
function creandoFondos(){
    //Creando objetos FONDOS DE INVERSION y agregandolos a la lista listaFondos
    //Conservador
    listaFondos.push(new FondoDeInversion("ADCAP PESOS PLUS Clase A","corto", 1000, "pesos", "48hs", "Renta Fija", 10.4625, 46, 3, "Conservador", listaFondos));
    listaFondos.push(new FondoDeInversion("FIMA PREMIUM Clase A", "corto", 1000, "pesos", "Inmediato", "Renta Fija", 12.1322, 35.73, 3.19, "Conservador", listaFondos));
    listaFondos.push(new FondoDeInversion("GALILEO AHORRO Clase A", "corto", 1000, "pesos", "24hs", "Renta Fija", 24.4339, 47.90, 4.42, "Conservador", listaFondos));
    listaFondos.push(new FondoDeInversion("TORONTO TRUST AHORRO Clase A", "corto", 1000, "pesos", "Inmediato", "Money Market", 7.3082, 37.23, 3.29, "Conservador", listaFondos));
    listaFondos.push(new FondoDeInversion("TORONTO TRUST LIQUIDEZ DÓLAR Clase A - Divisa", "corto", 1000, "dolares", "48hs", "Renta Fija", 1.0731, -0.24, -0.05, "Conservador", listaFondos));
    //Moderado
    listaFondos.push(new FondoDeInversion("ADCAP BALANCEADO II Clase A", "corto", 1000, "pesos", "48hs", "Renta Fija", 2.0810, 49.04, -0.86, "Moderado", listaFondos));
    listaFondos.push(new FondoDeInversion("ADCAP RENTA FIJA ARGENTINA Clase A", "corto",  1000, "pesos", "48hs", "Dolar Linked", 3.4528, 32.40, 2.67, "Moderado", listaFondos));
    listaFondos.push(new FondoDeInversion("ADCAP RETORNO TOTAL Clase A", "corto", 1000, "pesos", "24hs", "Renta Fija", 24.4339, 47.90, 4.42, "Moderado", listaFondos));
    listaFondos.push(new FondoDeInversion("ALLARIA COBERTURA DINÁMICA Clase A", "mediano", 1000, "pesos", "48hs", "Renta Fija", 1.3935, 39.35, 1.3935, "Moderado", listaFondos));
    listaFondos.push(new FondoDeInversion("ARGENFUNDS ABIERTO PYMES Clase B", "mediano", 10000, "pesos", "48hs", "Renta Fija", 3.2272, 36.64, 2.14, "Moderado", listaFondos));
    //Agresivo
    listaFondos.push(new FondoDeInversion("ADCAP BALANCEADO Clase A", "largo", 500, "pesos", "48hs", "Retorno Total", 6.4304, 39.52, 2.06, "Agresivo", listaFondos));
    listaFondos.push(new FondoDeInversion("ALLARIA ACCIONES Clase A", "largo", 1000, "pesos", "48hs", "Renta Variable", 33.7802, 53.68, 13.41, "Agresivo", listaFondos));
    listaFondos.push(new FondoDeInversion("TORONTO TRUST ARGENTINA 2021 Clase A", "largo", 1000, "pesos", "48hs", "Renta Mixta", 24.4339, 1.85, 2.03, "Agresivo", listaFondos));
    listaFondos.push(new FondoDeInversion("BALANZ ACCIONES Clase B", "largo", 20000, "pesos", "48hs", "Renta Variable", 5.64, 13.56, 57.13, "Agresivo", listaFondos));
    listaFondos.push(new FondoDeInversion("CMA ACCIONES Clase A", "largo", 2000, "pesos", "48hs", "Renta Variable", 3.2251, 51.21, 10.94, "Agresivo", listaFondos));
};
creandoFondos();

export { listaFondos };

