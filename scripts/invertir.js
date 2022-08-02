import { listaFondos } from "../scripts/index.js";
import { sesion } from "../scripts/session.js";

let resultadosParaMostrar = [];
resultadosParaMostrar = listaFondos.map(elemento => elemento);
resultadosParaMostrar.sort((a,b) => a.id - b.id);

let selectFCI = document.getElementById("select_fci");
let cuerpoPendientes = document.getElementById('pendientes_fci');
let detalle = document.getElementById('detalle_fci');//llamamos al contenedor de detalle

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
    sesion.pendientes.forEach(element => {

        let fondoEncontrado = resultadosParaMostrar.find(elemento => elemento.id == element.id) //SE TRAEN LOS DATOS SEGUN NUMERO DE ID
        
        let div = document.createElement('div');// creacion de boton eliminar (si no se crea div y se le da append, SOLO FUNCIONA EL ULTIMO DE LA LISTA)
        div.innerHTML = `${fondoEncontrado.nombre} $${element.monto} ${fondoEncontrado.moneda} <p id='eliminar_${element.id}' class='eliminar_lista_fci'>Eliminar</p> `
        cuerpoPendientes.append(div);//////////////////////////////////////////////////////////////////////////////////////////////////////

        const botonEliminar = document.getElementById(`eliminar_${element.id}`);
        botonEliminar.addEventListener('click', () => {
            sesion.pendientes.splice(element, 1);
            //MODIFICAMOS VARIABLE
            sesion[fondoEncontrado.moneda] += element.monto; 
            //MODIFICAMOS LOCALSTORAGE
            let cuentasAModificar = JSON.parse(localStorage.getItem('cuentas'));
            let usuarioAModificar = cuentasAModificar.find(elemento => elemento.usuario == sesion.usuario)
            console.log(usuarioAModificar['pendientes']);
            usuarioAModificar.pendientes = sesion.pendientes;
            usuarioAModificar[fondoEncontrado.moneda] = sesion[fondoEncontrado.moneda];
            localStorage.setItem('cuentas', JSON.stringify(cuentasAModificar));
            //MODIFICAMOS SESSIONSTORAGE
            let sesionAModificar = JSON.parse(sessionStorage.getItem('sesion'));
            sesionAModificar.pendientes = sesion.pendientes;
            sesionAModificar[fondoEncontrado.moneda] = sesion[fondoEncontrado.moneda];
            sessionStorage.setItem('sesion', JSON.stringify(sesionAModificar));

            location.reload();
        });
        console.log(fondoEncontrado.moneda);
        fondoEncontrado.moneda == 'pesos' ? cantidadPendientesPesos ++ : cantidadPendientesDolares ++; 
        fondoEncontrado.moneda == 'pesos' ? totalPesos += element.monto : totalDolares += element.monto; 

    });

    let div = document.createElement('div');
    div.innerHTML = `Fondos pendientes de suscripcion en Pesos: ${cantidadPendientesPesos}, TOTAL $${totalPesos}<br>
                    Fondos pendientes de suscripcion en Dolares: ${cantidadPendientesDolares}, TOTAL U$${totalDolares}`
    cuerpoPendientes.append(div);

};

if (sesion == null) {
    Swal.fire(
        `Debe identificarse`,
        `Para poder operar, debe estar registrado y logueado en el sistema.`,
        'error'
    );  
} else {

    listaPendientesSuscripcion();

    imprimirOptionsSelect(resultadosParaMostrar, selectFCI);

    //IMPRESION DE DETALLES DE FORMA PREDETERMINADA AL CARGAR LA PAGINA O CON LOS VALORES IMPORTADOS DESDE FCI.HTML MEDIANTES SESSIONSTORAGE
    let valueSelected = parseInt(sessionStorage.getItem('valueSelected')) ?? 1;
    selectFCI.selectedIndex = valueSelected - 1;// SE RESTA 1 YA QUE SE PASA EL ID PERO LA LISTA SELECT EMPIEZA DESDE 0
    let value = selectFCI.selectedIndex + 1;// SE SUMA 1 YA QUE LA LISTA SELECT EMPIEZA DESDE 0
    // SE CREA LA VARIABLE value, YA QUE ES LA QUE SE UTILIZA EN LAS FUNCIONES Y SE LE ASIGNA EL VALOR DE SELECTFCI.SELECTEDINDEX< EL CUAL SE IGUALA CON 
    // LA VARIABLE VALUESELECTED IMPORTADA DESDE SESSION STORAGE Y CREADA EN IMPRIMIRFONDOS.JS o SE IGUALA A 0 EN CASO DE UNDEFINED.
    imprimirDetallesFCI(value)
    suscribirFondo(value)
    sessionStorage.setItem('valueSelected', 1)

    //CREACION DE EVENTO AL CLICKEAR EN ELEMENTO DE LISTA
    selectFCI.addEventListener('change', (e) => {
        let value = e.target.value;
        imprimirDetallesFCI(value)
        suscribirFondo(value)
        });

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
                                <div class="detalle_fci_suscribir" id="detalle_fci_suscribir">SUSCRIBIR </div>
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
        //CREACION DE EVENTO DE BOTON SUSCRIBIR
        botonSuscribir.addEventListener('click', () => { 
            if (sesion == null) {// Si no esta logueado salta alert
                return Swal.fire(
                    `Debe identificarse`,
                    `Para poder suscribir fondos, debe estar registrado y logueado en el sistema.`,
                    'error'
                );  
            };
            let monto = parseFloat(prompt('Ingrese monto'));

            if (monto >= parseFloat(resultadosParaMostrar[value].inversionMinima)) {// Se analiza si el monto es superior al minimo requerido
                if (monto <= sesion[resultadosParaMostrar[value].moneda]) {//Se analiza si es menor o igual al saldo disponible.

                    let idExistente = sesion.pendientes.find(elemento => elemento.id == resultadosParaMostrar[value].id);
                    idExistente ? idExistente.monto += monto : sesion.pendientes.push({'id': resultadosParaMostrar[value].id, 'monto': monto});
                    //MODIFICAMOS VARIABLE
                    sesion[resultadosParaMostrar[value].moneda] -= monto;
                    //MODIFICAMOS LOCALSTORAGE
                    let cuentasAModificar = JSON.parse(localStorage.getItem('cuentas'));
                    cuentasAModificar.find(elemento => elemento.usuario == sesion.usuario).pendientes = sesion.pendientes;
                    cuentasAModificar.find(elemento => elemento.usuario == sesion.usuario)[resultadosParaMostrar[value].moneda] = sesion[resultadosParaMostrar[value].moneda];
                    localStorage.setItem('cuentas', JSON.stringify(cuentasAModificar));
                    //MODIFICAMOS SESSIONSTORAGE
                    let sesionAModificar = JSON.parse(sessionStorage.getItem('sesion'));
                    sesionAModificar.pendientes = sesion.pendientes;
                    sesionAModificar[resultadosParaMostrar[value].moneda] = sesion[resultadosParaMostrar[value].moneda];
                    sessionStorage.setItem('sesion', JSON.stringify(sesionAModificar));
                    alert(`Ha agregado a la lista de pendientes de suscripcion ${monto} ${resultadosParaMostrar[value].moneda} de ${resultadosParaMostrar[value].nombre} exitosamente. `);
                    location.reload();
                    } else {
                        alert(`No cuenta con saldo en su cuenta ${resultadosParaMostrar[value].moneda}`);
                    }
            } else {
                        alert(`No alcanza el minimo de inversion requerido`);
            }
            });
        };

};