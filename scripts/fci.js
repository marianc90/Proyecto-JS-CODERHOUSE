import { listaFondos } from "../scripts/index.js";
import { imprimirFondos } from "../scripts/imprimirfondos.js";

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
async function buscarMinimoInversion (){
    let { value: valor} = await Swal.fire({
        title: 'Seleccione el valor de su inversión',
        icon: 'question',
        input: 'range',
        inputLabel: 'Minimo',
        inputAttributes: {
          min: 500,
          max: 10000,
          step: 500
        },
        inputValue: 500
      });
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
async function filtrarMenorPlazo (){
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'corto': 'Corto',
            'mediano': 'Mediano',
            'largo': 'Largo'
          })
        }, 1000)
      })
      const { value: valor } = await Swal.fire({
        title: 'Ingrese el plazo de inversion deseado',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes elegir un valor'
          }
        }
      });
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.plazo == valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `<em>Se muestran ${resultadosParaMostrar.length} resultados para</em> <b>inversiones de ${valor} plazo.</b> <br><br>`;
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });

}
async function buscarMoneda (){
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'pesos': 'Pesos Argentinos',
            'dolares': 'Dólares Estadounidenses'
          })
        }, 300)
      })
      const { value: valor } = await Swal.fire({
        title: 'Ingrese la moneda',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes elegir un valor'
          }
        }
      });
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.moneda == valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `<em>Se muestran ${resultadosParaMostrar.length} resultados en</em> <b>${valor.toUpperCase()}</b>.<br><br>`;
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
async function filtrarPerfil (){
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'Conservador': 'Conservador',
            'Moderado': 'Moderado',
            'Agresivo': 'Agresivo'
          })
        }, 500)
      })
      const { value: valor } = await Swal.fire({
        title: 'Ingrese el perfil de riesgo deseado',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes elegir un valor'
          }
        }
      });
    let resultadosParaMostrar = [];
    resultadosParaMostrar = listaFondos.filter(elemento => elemento.perfil == valor);
    let cuerpoFCI = document.getElementById("cuerpo_fci");
    cuerpoFCI.innerHTML = `<em>Se muestran ${resultadosParaMostrar.length} resultados de </em><b>Perfil ${valor.toUpperCase()}</b>.<br><br>`;
    imprimirFondos(resultadosParaMostrar, cuerpoFCI);
    cuerpoFCI.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
//BOTON FILTROS
let botonFilterTodos = document.getElementById('btnFilterTodos');
botonFilterTodos.addEventListener("click", mostrarTodoFondos);

let botonFilterMinimoInv = document.getElementById('btnFilterMinimoInv');
botonFilterMinimoInv.addEventListener("click", async () => buscarMinimoInversion());

let botonFilterMayorRenta = document.getElementById('btnFilterMayorRenta');
botonFilterMayorRenta.addEventListener("click", filtrarMayorRentabilidadAnio);

let botonFilterPlazo = document.getElementById('btnFilterPlazo');
botonFilterPlazo.addEventListener("click", () => filtrarMenorPlazo());

let botonFilterMoneda = document.getElementById('btnFilterMoneda');
botonFilterMoneda.addEventListener("click", () => buscarMoneda());

let botonFilterPerfil = document.getElementById('btnFilterPerfil');
botonFilterPerfil.addEventListener("click", () => filtrarPerfil());
