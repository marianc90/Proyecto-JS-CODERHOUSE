import { sesion } from "../scripts/session.js";

export function actualizarLocalSession(){
    //MODIFICAMOS LOCALSTORAGE
    let cuentasAModificar = JSON.parse(localStorage.getItem('cuentas'));
    let usuarioAModificar = cuentasAModificar.find(elemento => elemento.usuario == sesion.usuario);
    let indexuUsuarioAModificar = cuentasAModificar.indexOf(usuarioAModificar);
    cuentasAModificar[indexuUsuarioAModificar] = sesion;
    localStorage.setItem('cuentas', JSON.stringify(cuentasAModificar));
    //MODIFICAMOS SESSIONSTORAGE
    let sesionAModificar = JSON.parse(sessionStorage.getItem('sesion'));
    sesionAModificar = sesion;
    sessionStorage.setItem('sesion', JSON.stringify(sesionAModificar));
};