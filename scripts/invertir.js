import { importarFondos } from "../scripts/index.js";
import { sesion } from "../scripts/session.js";
import { actualizarLocalSession } from "../scripts/actualizarLocalSession.js";

let listaFondos;
let resultadosParaMostrar = [];
let valueSelected;
let value;

let selectFCI = document.getElementById("select_fci");
let cuerpoPendientes = document.getElementById('pendientes_fci');
let detalle = document.getElementById('detalle_fci');//llamamos al contenedor de detalle

document.addEventListener('DOMContentLoaded', e => {
    awaitFetch();
})

//FUNCION PARA IMPRIMIR LISTA DE OPTIONS EN SELECT
function imprimirOptionsSelect(resultadosParaMostrar, selectFCI){
    for (const recorrerArray in resultadosParaMostrar) {
        let option = document.createElement("option"); //Creamos el option contenedor del resultado a mostrar en lista
        option.value = resultadosParaMostrar[recorrerArray].id;
        option.text = resultadosParaMostrar[recorrerArray].nombre; 
        selectFCI.append(option);
    }
    resultadosParaMostrar.unshift(''); // le agregamos un valor vacio al array para que coincida el numero de id con el numero de indice. 
}
function listaPendientesSuscripcion(){
    let cantidadPendientesPesos = 0;
    let cantidadPendientesDolares = 0;
    let totalPesos = 0;
    let totalDolares = 0;
    //PARA ELIMINAR DE PENDIENTES DE SUSCRIBIR
    if (sesion?.pendientes.length > 0) {
    cuerpoPendientes.innerHTML +=`<br><strong>PENDIENTES DE SUSCRIPCION</strong>`;
    
    sesion.pendientes.forEach(element => {
        let fondoEncontrado = resultadosParaMostrar.find(elemento => elemento.id == element.id) //SE TRAEN LOS DATOS SEGUN NUMERO DE ID
        
        let li= document.createElement('li');// creacion de boton eliminar (si no se crea li y se le da append, SOLO FUNCIONA EL ULTIMO DE LA LISTA)
        li.innerHTML = `${fondoEncontrado.nombre}: - $${element.monto} ${fondoEncontrado.moneda} <button id='eliminar_${element.id}' class='eliminar_lista_fci'>x</button> `
        cuerpoPendientes.append(li);//////////////////////////////////////////////////////////////////////////////////////////////////////

        const botonEliminar = document.getElementById(`eliminar_${element.id}`);
        botonEliminar.className = 'btnEstandar';
        botonEliminar.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: `¿Desea eliminar ${fondoEncontrado.nombre} de la lista de PENDIENTES?`,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar'
              }).then( async (result) => {
                if (result.isConfirmed) {
                    sesion.pendientes.splice(sesion.pendientes.indexOf(element), 1);
                    //MODIFICAMOS VARIABLE
                    sesion[fondoEncontrado.moneda] += element.monto; 
                    actualizarLocalSession();
                    await Swal.fire(
                        `Ha eliminado ${fondoEncontrado.nombre}`,
                        `de la lista de PENDIENTES`,
                        'success'
                      );
                    location.reload();
                }

            });
        });
        fondoEncontrado.moneda == 'pesos' ? cantidadPendientesPesos ++ : cantidadPendientesDolares ++; 
        fondoEncontrado.moneda == 'pesos' ? totalPesos += element.monto : totalDolares += element.monto; 

    });

    let div = document.createElement('div');
    div.innerHTML = `<br><br>En Pesos: ${cantidadPendientesPesos} por $${totalPesos}<br>
                    En Dolares: ${cantidadPendientesDolares} por U$${totalDolares}<br><br>`
    cuerpoPendientes.append(div);
    let botonConfirmar = document.createElement('button');
    botonConfirmar.innerHTML = 'CONFIRMAR SUSCRIPCION';
    botonConfirmar.className = 'btnEstandar';
    cuerpoPendientes.append(botonConfirmar);
    botonConfirmar.addEventListener('click',(e)=>
        {
           e.preventDefault();
           Swal.fire({
            title: `¿Suscribir la totalidad de los fondos pendientes?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Suscribir'
          }).then( async (result) => {
            if (result.isConfirmed) {
                sesion.pendientes.forEach(element => {
                    if (sesion.suscripciones?.find(buscar => buscar.id == element.id)) {
                        let indexIdSuscripto = sesion.suscripciones.indexOf(sesion.suscripciones.find(buscar => buscar.id == element.id))
                        sesion.suscripciones[indexIdSuscripto].monto += element.monto;
                    } else {
                        sesion.suscripciones.push(element);
                    }
               });
               sesion.pendientes = [];
               actualizarLocalSession();
                await Swal.fire(
                    `Ha suscripto los fondos seleccionados`,
                    `Será redirigido a la sección Tenencias, donde podrá visualizarlos. <br><br>Los fondos se han debitado de su cuenta`,
                    'success'
                  );
                window.location.replace("../pages/tenencias.html");
            }
          });
        });
    };
};
function imprimirDetallesFCI(value){

    detalle.innerHTML = '';//lo limpieamos para que no se sobreescriba
    detalle.innerHTML = `<div class='detalle_fci_titulo'><h1>${resultadosParaMostrar[value].nombre}</h1></div>
                        <div class='detalle_fci_contenido'> <p>Plazo de permanencia sugerido: <b>${(resultadosParaMostrar[value].plazo).toUpperCase()}</b></p>
                                                            <p>Monto minimo de inversion: <b>$${resultadosParaMostrar[value].inversionMinima} ${(resultadosParaMostrar[value].moneda).toUpperCase()}</b></p>
                                                            <p>Tiempo de rescate: <b>${resultadosParaMostrar[value].rescate}</b></p>
                                                            <p>Tipo de Renta: <b>${resultadosParaMostrar[value].tipoRenta}</b></p>
                                                            <p>Valor de la cuotaparte: <b>${resultadosParaMostrar[value].valorCuotaparte}</b></p>
                                                            <br>
                                                            <center><b>RENTABILIDAD</b><p> Ultimo año: <b id='renta-anio'>%${resultadosParaMostrar[value].rentabilidad.ultimoAño}</b>
                                                                            Ultimo mes: <b id='renta-mes'>%${resultadosParaMostrar[value].rentabilidad.ultimoMes}</b></p></center>
                                                            <center><b><p>PERFIL ${resultadosParaMostrar[value].perfil}</b></p></center>
        
                        </div>
                        <div class="detalle_fci_botones" id="detalle_fci_botones">
                        <button class="detalle_fci_suscribir" id="detalle_fci_suscribir">SUSCRIBIR </button>
                        </div>`
        // ASIGNACION DE COLOR SEGUN SI RENTABILIDAD ES POSITIVA O NEGATIVA
    let rentaAnio = document.getElementById('renta-anio');
    let rentaMes = document.getElementById('renta-mes');
    resultadosParaMostrar[value].rentabilidad.ultimoAño > 0 ? rentaAnio.className = 'verde' : rentaAnio.className = 'rojo';
    resultadosParaMostrar[value].rentabilidad.ultimoMes > 0 ? rentaMes.className = 'verde' : rentaMes.className = 'rojo';
}
function suscribirFondo(value){
    //creacion del boton SUSCRIBIR
    let botonSuscribir = document.getElementById('detalle_fci_suscribir')
    botonSuscribir.classList.add('btnEstandar');
    //CREACION DE EVENTO DE BOTON SUSCRIBIR
    botonSuscribir.addEventListener('click', async (e) => { 
        e.preventDefault();
        if (sesion == null) {// Si no esta logueado salta alert
//            sessionStorage.setItem('valueSelected', selectFCI.selectedIndex + 1)
            return Swal.fire(
                `Debe identificarse`,
                `Para poder suscribir fondos, debe estar registrado y logueado en el sistema.`,
                'error'
            );
        };
        let { value: monto } = await Swal.fire({
            title: 'Ingrese monto a invertir',
            input: 'number',
            inputPlaceholder: 'Ingrese monto aquí',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
          });
          monto = parseFloat(monto);

        if (monto >= parseFloat(resultadosParaMostrar[value].inversionMinima)) {// Se analiza si el monto es superior al minimo requerido
            if (monto <= sesion[resultadosParaMostrar[value].moneda]) {//Se analiza si es menor o igual al saldo disponible.

                let idExistente = sesion.pendientes.find(elemento => elemento.id == resultadosParaMostrar[value].id);
                idExistente ? idExistente.monto += monto : sesion.pendientes.push({'id': resultadosParaMostrar[value].id, 'monto': monto});
                //MODIFICAMOS VARIABLE
                sesion[resultadosParaMostrar[value].moneda] -= monto;
                actualizarLocalSession();
                await Swal.fire(
                    `${resultadosParaMostrar[value].nombre}`,
                    `por $${monto} ${resultadosParaMostrar[value].moneda} agregados exitosamente.`,
                    'success'
                );
                location.reload();
                } else {
                    Swal.fire(
                        `Fondos Insuficientes`,
                        `No cuenta con saldo suficiente en su cuenta ${resultadosParaMostrar[value].moneda}.`,
                        'error'
                    );
                }
        } else {
            Swal.fire(
                `Minimo no alcanzado`,
                `No alcanza el minimo de inversión requerido: <br>$${resultadosParaMostrar[value].inversionMinima} ${resultadosParaMostrar[value].moneda}.`,
                'error'
            );
        }
        });
};
async function awaitFetch(){
    listaFondos = await importarFondos();

    resultadosParaMostrar = listaFondos.map(elemento => elemento);
    resultadosParaMostrar.sort((a,b) => a.id - b.id);

    imprimirOptionsSelect(resultadosParaMostrar, selectFCI);// SE IMPRIMEN LOS FCI EN LA LISTA SELECT
    sesion?.pendientes && listaPendientesSuscripcion(); // SI ESTA LA SESION INICIADA SE MUESTRA LA LISTA DE PENDIENTES DE SUSCRIPCION
    
    valueSelected = parseInt(sessionStorage.getItem('valueSelected')) ?? 1;//IMPRESION DE DETALLES DE FORMA PREDETERMINADA AL CARGAR LA PAGINA O CON LOS VALORES IMPORTADOS DESDE FCI.HTML MEDIANTES SESSIONSTORAGE
    selectFCI.selectedIndex = valueSelected - 1;// SE RESTA 1 YA QUE SE PASA EL ID PERO LA LISTA SELECT EMPIEZA DESDE 0
    // SE CREA LA VARIABLE value, YA QUE ES LA QUE SE UTILIZA EN LAS FUNCIONES PARA IMPRIMIR RESULTADOS Y SUSCRIBIR, Y SE LE ASIGNA EL VALOR DE SELECTFCI.SELECTEDINDEX< EL CUAL SE IGUALA CON LA VARIABLE VALUESELECTED IMPORTADA DESDE SESSION STORAGE Y CREADA EN IMPRIMIRFONDOS.JS o SE IGUALA A 0 EN CASO DE UNDEFINED.
    value = selectFCI.selectedIndex + 1;// SE SUMA 1 YA QUE LA LISTA SELECT EMPIEZA DESDE 0
    imprimirDetallesFCI(value)
    suscribirFondo(value)
    //sessionStorage.setItem('valueSelected', 1) // SE VUELVE A PONER EL VALUESELECT A 1 PARA QUE NO QUEDE SELECCIONADA LA OPCION ELEGIDA EN FCI.HTML O TESTINVERSOR.HTTML
}

//CREACION DE EVENTO AL CLICKEAR EN ELEMENTO DE LISTA
selectFCI.addEventListener('change', (e) => {
    let value = e.target.value;
    imprimirDetallesFCI(value)
    suscribirFondo(value)
    sessionStorage.setItem('valueSelected', selectFCI.selectedIndex + 1) 
    });