let flecha = document.getElementById('flecha-abajo');
let contenedor = document.getElementById('contenedor');

if (window.matchMedia("(min-width: 600px)").matches) {
    flecha.addEventListener('click', () => {
    contenedor.scrollIntoView({block: "end", behavior: "smooth"});
    })    
  } else {
    flecha.addEventListener('click', () => {
    window.scrollTo(0,500);
    })    
  }
