import { importarFondos } from "../scripts/index.js";
import { sesion } from "../scripts/session.js";
import { actualizarLocalSession } from "../scripts/actualizarLocalSession.js";
import { msToTime } from "../scripts/msToTime.js";

let resultadosParaMostrar = [];

let tenenciasContenedor = document.getElementById('cuerpo_tenencias');// llamamos al contenedor
let tenenciasTitulo = document.getElementById('banner_titulo');

let cantidadSuscripcionesPesos = 0;
let cantidadSuscripcionesDolares = 0;
let totalPesos = 0;
let totalDolares = 0;

document.addEventListener('DOMContentLoaded', e => {
    awaitFetch();
})

async function awaitFetch(){
    let listaFondos = await importarFondos();

    resultadosParaMostrar = listaFondos.map(elemento => elemento);
    resultadosParaMostrar.sort((a,b) => a.id - b.id);

    //PARA imprimir fondos suscriptos

    if (sesion?.suscripciones.length > 0) {
        tenenciasContenedor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        tenenciasContenedor.innerHTML +=`<h1>FONDOS SUSCRIPTOS</h1><br><br>`;
        tenenciasTitulo.innerHTML = `YA ESTAS INVIRTIENDO<br> `
        
        sesion.suscripciones.forEach(element => {
            let fondoEncontrado = resultadosParaMostrar.find(elemento => elemento.id == element.id) //SE TRAEN LOS DATOS SEGUN NUMERO DE ID
            
            let li = document.createElement('li');// creacion de boton eliminar (si no se crea li y se le da append, SOLO FUNCIONA EL ULTIMO DE LA LISTA)
            li.innerHTML = `${fondoEncontrado.nombre}<br> 
                            - $${element.monto} ${fondoEncontrado.moneda}<br>
                            - Rescate <span id='tiempoRescate_${element.id}'></span><br><br>
                            <button id='rescatar_${element.id}' class='rescatar_lista_fci'>Rescatar</button><br><br>
                            <hr /><br> `
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
                        let fechaActual = Date.now();
                        if ((fechaActual - parseInt(element.fecha)) >= parseInt(fondoEncontrado.rescateMiliseg)){ //VERIFICA SI EL TIEMPO EN MILISEGUNDOS ES MAYOR O IGUAL AL TIEMPO MINIMO DE RESCATE
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
                        else {
                            let tiempoRestante = msToTime(parseInt(fondoEncontrado.rescateMiliseg) - (fechaActual - (parseInt(element.fecha))));
                            await Swal.fire(
                                `Tiempo de espera`,
                                `Debe aguardar ${tiempoRestante} para retirar su dinero`,
                                'error'
                            );

                        }
                    }
                  });
            });

            // MOSTRAR TOTALES POR CADA MONEDA
            fondoEncontrado.moneda == 'pesos' ? cantidadSuscripcionesPesos ++ : cantidadSuscripcionesDolares ++; 
            fondoEncontrado.moneda == 'pesos' ? totalPesos += element.monto : totalDolares += element.monto; 

            // MOSTRAR TIEMPO RESTANTE PARA RESCATE
            let tiempoContenedor = document.getElementById(`tiempoRescate_${element.id}`)
            let tiempoMostrar = document.createElement('span');
            var timer = setInterval(function(){
                let fechaActual = Date.now();
                let tiempoRestante = msToTime(parseInt(fondoEncontrado.rescateMiliseg) - (fechaActual - (parseInt(element.fecha))));
                let tiempoRestanteMiliseg = parseInt(fondoEncontrado.rescateMiliseg) - (fechaActual - (parseInt(element.fecha)));

                tiempoMostrar.innerHTML=` en ${tiempoRestante}`;
                tiempoContenedor.append(tiempoMostrar)

                if (tiempoRestanteMiliseg < 0) {
                    tiempoMostrar.innerHTML=` disponible`;
                    clearInterval(timer);
                }
            }, 1000);
            // FIN MOSTRAR TIEMPO RESTANTE PARA RESCATE

        

        });
        
        let div = document.createElement('div');
        div.innerHTML = `<br>Total en Pesos: ${cantidadSuscripcionesPesos} por $${totalPesos}<br>
                        Total en Dolares: ${cantidadSuscripcionesDolares} por U$${totalDolares}<br><br>`
        tenenciasContenedor.append(div);
        
        };
        

}