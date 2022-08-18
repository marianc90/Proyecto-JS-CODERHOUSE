//Creación de clase de fondos de inversion
class FondoDeInversion {
    constructor(nombre, plazo, inversionMinima, moneda, rescate, rescateMiliseg, tipoRenta, valorCuotaparte, ultimoAño, ultimoMes, perfil, longitud) {
     this.nombre = nombre;
     this.plazo = plazo;
     this.inversionMinima = inversionMinima;
     this.moneda = moneda;
     this.rescate = rescate;
     this.rescateMiliseg = rescateMiliseg;
     this.tipoRenta = tipoRenta;
     this.valorCuotaparte = valorCuotaparte;
     this.rentabilidad = {ultimoAño: ultimoAño,
                          ultimoMes: ultimoMes};
     this.perfil = perfil;
     this.id = longitud.length + 1;
    }
};
const listaFondos = [];
 //Creando objetos FONDOS DE INVERSION y agregandolos a la lista listaFondos
async function importarFondos (){
    const response = await fetch("../scripts/fondos.json");
    const data = await response.json();

    for (let fondo of data){
        listaFondos.push(new FondoDeInversion(fondo.nombre,fondo.plazo,fondo.inversionMinima,fondo.moneda,fondo.rescate,fondo.rescateMiliseg,fondo.tipoRenta,fondo.valorCuotaparte,fondo.rentabilidad.ultimoAño, fondo.rentabilidad.ultimoMes, fondo.perfil, listaFondos));
    }

    return listaFondos;
}

export { importarFondos };

