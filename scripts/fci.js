import { listaFondos } from "../scripts/index.js";


//FILTROS Y BUSQUEDA------------------------------------------------------------------------------------------------------------
function mostrarTodoFondos () {
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.map(elemento => elemento);
    resultadosParaMostrar.sort((a,b) => a.nombre - b.nombre);

    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = (`<em>Se muestran ${resultadosParaMostrar.length} resultados en total por:</em><b> orden alfabético</b>.<br><br>`);
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function buscarMinimoInversion (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.inversionMinima <= valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `<em>Se muestran ${resultadosParaMostrar.length} resultados por debajo de:</em> <b>${valor} Pesos/Dolares de inversión mínima: </b><br><br>`;
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function filtrarMayorRentabilidadAnio () {
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.map(elemento => elemento);
    resultadosParaMostrar.sort((a,b) => b.rentabilidad.ultimoAño - a.rentabilidad.ultimoAño);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `<em>Se muestran ${resultadosParaMostrar.length} resultados ordenados por: </em> <b>mayor nivel de rentabilidad</b>.<br><br>`;
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function filtrarMenorPlazo (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.plazo == valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `<em>Se muestran ${resultadosParaMostrar.length} resultados para</em> <b>inversiones de ${valor} plazo.</b> <br><br>`;
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });

}
function buscarMoneda (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.moneda == valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `<em>Se muestran ${resultadosParaMostrar.length} resultados en</em> <b>${valor.toUpperCase()}</b>.<br><br>`;
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function filtrarPerfil (valor){
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.perfil == valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `<em>Se muestran ${resultadosParaMostrar.length} resultados de </em><b>Perfil ${valor.toUpperCase()}</b>.<br><br>`;
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
// IMPRESION DE RESULTADOS MEDIANTE BUCLE PARA APLICAR A CADA UNO DE LOS FILTROS
function imprimirFondos(resultadosParaMostrar, cuerpoFCI){
    for (const recorrerArray in resultadosParaMostrar) {
        let li = document.createElement("li"); //Creamos el Li contenedor del resultado a mostrar en lista
        li.innerHTML = `<span id="enlace_${resultadosParaMostrar[recorrerArray].id}">${resultadosParaMostrar[recorrerArray].nombre}</span><br><br>`; 
        //Insertamos un span con el id dinamico para luego llamarlo mediante getElementbyID
        cuerpoFCI.append(li);
        li.classList.add('lista_fci');// esta clase solo agregar pointer al cursor
        let botonMostrar = document.getElementById(`enlace_${resultadosParaMostrar[recorrerArray].id}`);//llamamos al span y lo guardamos en botonMostrar
        let modal = document.getElementById('modal_fci');//llamamos a al modal oculto
        
        botonMostrar.addEventListener("click", () => {
        modal.className = 'modal_fci';//hacemos al modal visible mediante modificacion de la clase
        modal.innerHTML = '';//lo limpieamos para que no se sobreescriba
        modal.innerHTML = `<div class='modal_fci_titulo'><h1>${resultadosParaMostrar[recorrerArray].nombre}</h1></div>
                           <div class='modal_fci_contenido'> <p>Plazo de permanencia sugerido: <b>${(resultadosParaMostrar[recorrerArray].plazo).toUpperCase()}</b></p>
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
}

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

let botonFilterPerfil = document.getElementById('btnFilterPerfil');
botonFilterPerfil.addEventListener("click", () => filtrarPerfil(prompt("Ingrese el Perfil deseado (Conservador / Moderado / Agresivo)")));
