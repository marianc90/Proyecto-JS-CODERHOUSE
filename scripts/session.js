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

sesionRegistro.addEventListener('click', async () => {
    let { value: usuario } = await Swal.fire({
        title: 'Ingrese usuario a registrar',
        input: 'text',
        inputPlaceholder: 'Ingrese usuario nuevo aquí'
      });  
    let { value: contrasena } = await Swal.fire({
        title: 'Ingrese contraseña nueva',
        input: 'password',
        inputPlaceholder: 'Ingrese contraseña nueva aquí'
      });  
    if (usuario && contrasena) {
        cuentas.push({'usuario': usuario, 'contrasena': contrasena, 'perfil': ''});
        localStorage.setItem('cuentas', JSON.stringify(cuentas));
        Swal.fire(
            `Genial ${usuario}!`,
            'Se ha registrado exitosamente!',
            'success'
          );    
    } else {
        Swal.fire(
            `Error`,
            'Debe ingresar datos validos',
            'error'
          );  
    };

    });

sesionIniciar.addEventListener('click', async () => {
   // let usuarioIngresado = prompt('Ingrese Usuario');
    let { value: usuarioIngresado } = await Swal.fire({
        title: 'Ingrese su usuario',
        input: 'text',
        inputPlaceholder: 'Ingrese usuario aquí'
      });  
    let { value: contrasenaIngresada } = await Swal.fire({
        title: 'Ingrese su contraseña',
        input: 'password',
        inputPlaceholder: 'Ingrese contraseña aquí'
      });  
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
            title: `Hola ${usuarioNombre}!`,
            showConfirmButton: true,
          }).then( (result) => {
            if (result.isConfirmed) {
              location.reload();}});
    } else {
        Swal.fire(
            'Datos incorrectos',
            'No ha ingresado datos validos',
            'error'
          );
    };
    
});

sesionCerrar.addEventListener('click', async () => {
    Swal.fire({
        title: 'Esta seguro de cerrar su sesión?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cerrar sesión'
      }).then( async (result) => {
        if (result.isConfirmed) {
            sesionIniciar.classList.remove('none');
            sesionCerrar.classList.add('none');
            sesionRegistro.classList.remove('none');
            usuarioNombre = 'Invitado';
            sesionStatus.innerHTML = `- ( ${usuarioNombre} ) -`;
            sesion = null;
            sessionStorage.clear();
            await Swal.fire(
                'Ha cerrado sesion correctamente',
                'Vuelva pronto',
                'success'
              );
            location.reload();
        }
      });
});

export { sesion };