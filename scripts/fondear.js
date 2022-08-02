import { sesion } from "../scripts/session.js";

let formularioFondear = document.getElementById('fondear_formulario');
let saldoActualPesos = document.getElementById('saldo_pesos');
let saldoActualDolares = document.getElementById('saldo_dolares');
saldoActualPesos.innerHTML = `$ ${sesion?.pesos ?? ""}`;
saldoActualDolares.innerHTML = `U$ ${sesion?.dolares ?? ""}`;

formularioFondear.addEventListener('submit',async (e) => {
    e.preventDefault();
    if (sesion == null) {
        return Swal.fire(
            `Debe identificarse`,
            `Para fondear su cuenta, debe estar registrado y logueado en el sistema.`,
            'error'
        );  
    };
    let fondos = parseFloat(e.target.children[0].form[0].value);
    let pesos = e.target.children[0].form[1].checked;
    let dolares = e.target.children[0].form[2].checked;
    let cuentasAModificar = JSON.parse(localStorage.getItem('cuentas'));
    let sesionAModificar = JSON.parse(sessionStorage.getItem('sesion'));
    if (pesos){ //Verifica si esta marcado Pesos
       sesion.pesos += fondos; //SE MODIFICA EL VALOR DE LA PROPIEDAD PERFIL EN LA VARIABLE
       //SE ACTUALIZAN LOS VALORES DE LA PROPIEDAD FONDOS DEL USUARIO EN EL LOCALSTORAGE
       cuentasAModificar.find(elemento => elemento.usuario == sesion.usuario).pesos = sesion.pesos;
       localStorage.setItem('cuentas', JSON.stringify(cuentasAModificar));
       //SE ACTUALIZAN LOS VALORES DE LA PROPIEDAD FONDOS DEL USUARIO EN EL SESSIONSTORAGE
       sesionAModificar.pesos = sesion.pesos;
       sessionStorage.setItem('sesion', JSON.stringify(sesionAModificar));
       await Swal.fire(
        'Fondeo Exitoso',
        `Ha ingresado $${fondos} en su cuenta. <br>Saldo actual $${sesion.pesos}`,
        'success'
      );
      location.reload();

    } else {
       sesion.dolares += fondos;
       //SE ACTUALIZAN LOS VALORES DE LA PROPIEDAD FONDOS DEL USUARIO EN EL LOCALSTORAGE
       cuentasAModificar.find(elemento => elemento.usuario == sesion.usuario).dolares = sesion.dolares;
       localStorage.setItem('cuentas', JSON.stringify(cuentasAModificar));
       //SE ACTUALIZAN LOS VALORES DE LA PROPIEDAD FONDOS DEL USUARIO EN EL SESSIONSTORAGE
       sesionAModificar.dolares = sesion.dolares;
       sessionStorage.setItem('sesion', JSON.stringify(sesionAModificar));
       await Swal.fire(
        'Fondeo Exitoso',
        `Ha ingresado U$${fondos} en su cuenta. <br>Saldo actual U$${sesion.dolares}`,
        'success'
      );
      location.reload();
    }
})