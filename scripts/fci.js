import { listaFondos } from "../scripts/index.js";


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
let botonFilterTodos = document.getElementById('btnFilterTodos');
botonFilterTodos.addEventListener("click", mostrarTodoFondos);

let botonFilterMinimoInv = document.getElementById('btnFilterMinimoInv');
botonFilterMinimoInv.addEventListener("click", () => buscarMinimoInversion(prompt("Ingrese el monto mínimo a invertir deseado: 500/1000/2000")));

let botonFilterMayorRenta = document.getElementById('btnFilterMayorRenta');
botonFilterMayorRenta.addEventListener("click", filtrarMayorRentabilidadAnio);

let botonFilterPlazo = document.getElementById('btnFilterPlazo');
botonFilterPlazo.addEventListener("click", () => filtrarMenorPlazo(prompt("Ingrese el plazo de la inversion deseado (Corto/Mediano/Largo").toLowerCase()));

let botonFilterMoneda = document.getElementById('btnFilterMoneda');
botonFilterMoneda.addEventListener("click", () => buscarMoneda(prompt("Ingrese la moneda a filtrar (pesos / dolares)").toLowerCase()));

