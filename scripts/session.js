const sesionBoton = document.getElementById('sesion-boton');
const sesionIniciar = document.getElementById('sesion-iniciar');
const sesionCerrar = document.getElementById('sesion-cerrar');
const sesionRegistro = document.getElementById('sesion-registro');

let cuentas = (JSON.parse(localStorage.getItem('cuentas'))) || [] ;
let sesion = (JSON.parse(sessionStorage.getItem('sesion'))) || null ;
let usuarioNombre = sesion?.usuario ?? 'Invitado';

let sesionStatus = document.getElementById('sesion-status');
sesionStatus.innerHTML = `- ( ${usuarioNombre} ) -`;

sesion && sesionIniciar.classList.add('none');
sesion && sesionCerrar.classList.remove('none');
sesion && sesionRegistro.classList.add('none');

sesionRegistro.addEventListener('click', () => {
    let usuario = prompt('Ingrese Usuario a registrar');
    let contrasena = prompt('Ingrese contraseña a registrar');
    if (usuario && contrasena) {
        cuentas.push({'usuario': usuario, 'contrasena': contrasena, 'perfil': ''});
        }
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    Swal.fire(
        'Genial!',
        'Se haregistrado exitosamente!',
        'success'
      );
    });

sesionIniciar.addEventListener('click', () => {
    let usuarioIngresado = prompt('Ingrese Usuario');
    let contrasenaIngresada = prompt('Ingrese contraseña');
    let cuentaExistente = cuentas.find(cuenta => cuenta.usuario == usuarioIngresado);
    if (cuentaExistente && cuentaExistente.contrasena == contrasenaIngresada) {
        sesion = {...cuentaExistente};
        sessionStorage.setItem('sesion', JSON.stringify(sesion));
        sesionIniciar.classList.add('none');
        sesionCerrar.classList.remove('none');
        sesionRegistro.classList.add('none');
        usuarioNombre = sesion?.usuario ?? 'Invitado';
        sesionStatus.innerHTML = `- ( ${usuarioNombre} ) -`;
        Swal.fire({
            icon: 'success',
            title: `Bienvenido/a ${usuarioNombre}`,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success');
              location.reload();}});
    } else {
        alert('No ha ingresado datos validos')
    };
    
});

sesionCerrar.addEventListener('click', () => {
    sesionIniciar.classList.remove('none');
    sesionCerrar.classList.add('none');
    sesionRegistro.classList.remove('none');
    usuarioNombre = 'Invitado';
    sesionStatus.innerHTML = `- ( ${usuarioNombre} ) -`;
    sesion = null;
    sessionStorage.clear();
    location.reload()
});

export { sesion };