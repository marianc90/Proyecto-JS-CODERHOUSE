// IMPRESION DE RESULTADOS MEDIANTE BUCLE PARA APLICAR A CADA UNO DE LOS FILTROS
let valueSelected;

export function imprimirFondos(resultadosParaMostrar, cuerpoFCI){
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
                           <div class='modal_fci_imagen'><img class='modal_fci_imagen--imagen' src='${resultadosParaMostrar[recorrerArray].imagen}' alt='imagen-fci'></div>
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
                            <div class="modal_fci_suscribir" id="modal_fci_suscribir">IR A SUSCRIBIR </div>
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
        let botonSuscribir = document.getElementById('modal_fci_suscribir')
        botonSuscribir.addEventListener('click', () =>{
            valueSelected = resultadosParaMostrar[recorrerArray].id;
            sessionStorage.setItem('valueSelected', valueSelected);
            sessionStorage.setItem('redirected', '1');//PARA MARCAR QUE VA REDIRIGIDO
            window.location.replace("../pages/invertir.html");

        })
        
        });
        };
}