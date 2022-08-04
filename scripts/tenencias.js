import { listaFondos } from "../scripts/index.js";
import { sesion } from "../scripts/session.js";
import { actualizarLocalSession } from "../scripts/actualizarLocalSession.js";

let resultadosParaMostrar = [];
resultadosParaMostrar = listaFondos.map(elemento => elemento);
resultadosParaMostrar.sort((a,b) => a.id - b.id);

let tenenciasContenedor = document.getElementById('tenencias_contenedor');// llamamos al contenedor
let tenenciasTitulo = document.getElementById('banner_titulo');

let cantidadSuscripcionesPesos = 0;
let cantidadSuscripcionesDolares = 0;
let totalPesos = 0;
let totalDolares = 0;
//PARA imprimir fondos suscriptos
if (sesion?.suscripciones.length > 0) {
tenenciasContenedor.innerHTML +=`<strong>FONDOS SUSCRIPTOS</strong>`;
tenenciasTitulo.innerHTML = `YA ESTAS INVIRTIENDO<br> `

sesion.suscripciones.forEach(element => {
    let fondoEncontrado = resultadosParaMostrar.find(elemento => elemento.id == element.id) //SE TRAEN LOS DATOS SEGUN NUMERO DE ID
    
    let li = document.createElement('li');// creacion de boton eliminar (si no se crea li y se le da append, SOLO FUNCIONA EL ULTIMO DE LA LISTA)
    li.innerHTML = `<button id='rescatar_${element.id}' class='rescatar_lista_fci'>Rescatar</button> - ${fondoEncontrado.nombre}: - $${element.monto} ${fondoEncontrado.moneda} `
    tenenciasContenedor.append(li);//////////////////////////////////////////////////////////////////////////////////////////////////////

    const botonRescatar = document.getElementById(`rescatar_${element.id}`);
    botonRescatar.className = 'btnEstandar';
    botonRescatar.addEventListener('click', (e) => {
        e.preventDefault();
        Swal.fire({
            title: `¿Desea ejecutar el Rescate de ${fondoEncontrado.nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Rescatar'
          }).then( async (result) => {
            if (result.isConfirmed) {
                sesion.suscripciones.splice(sesion.suscripciones.indexOf(element), 1);
                //MODIFICAMOS VARIABLE
                sesion[fondoEncontrado.moneda] += element.monto; 
                actualizarLocalSession();
                await Swal.fire(
                    `Ha rescatado sus fondos de ${fondoEncontrado.nombre}`,
                    `$${element.monto} ${fondoEncontrado.moneda} han sido depositados en su cuenta`,
                    'success'
                  );
                location.reload();
            }
          });
    });
    fondoEncontrado.moneda == 'pesos' ? cantidadSuscripcionesPesos ++ : cantidadSuscripcionesDolares ++; 
    fondoEncontrado.moneda == 'pesos' ? totalPesos += element.monto : totalDolares += element.monto; 

});

let div = document.createElement('div');
div.innerHTML = `<br>Total en Pesos: ${cantidadSuscripcionesPesos} por $${totalPesos}<br>
                Total en Dolares: ${cantidadSuscripcionesDolares} por U$${totalDolares}<br><br>`
tenenciasContenedor.append(div);

};
