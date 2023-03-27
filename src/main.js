import { baseDatos } from './data.js';

/* Siguiente sección*/

let botones = document.querySelectorAll(".navigation button")
botones.forEach(function (elemento) {
  elemento.addEventListener('click', (event) => {
    let seccion = event.currentTarget.dataset.section;
    let secciones = document.getElementsByTagName("section");

    if (seccion === 'section2' || seccion === 'section3' || seccion === 'section4' || seccion === 'section5' || seccion === 'section6') {
      /* Llamor la funcion desde data js*/
      baseDatos()
    }

    if (seccion != 'section1') {
      // Ocultar texto de los botones
      document.querySelectorAll("button span").forEach((span) => {
        span.style.display = 'none'
      })
    } else {
      document.querySelectorAll("button span").forEach((span) => {
        span.style.display = 'inline'
      })
    }

    for (let i = 0; i < secciones.length; i++) {
      secciones[i].style.display = "none";
    }
    document.getElementById(seccion).style.display = "flex";

    /* Hechizos*/
    const totalResultados = document.getElementById("contenedorspells");
    totalResultados.innerHTML = "";
    document.getElementById("informacion").value = "";
    document.getElementById("busquedaSpell1").value = "";

    /*Casas de Hogwarts*/
    const totalResultadosCasas = document.getElementById("contenedorhouse");
    totalResultadosCasas.innerHTML = "";
    document.getElementById("ordencasas").value = "";
    document.getElementById("busquedaHouse").value = "";

    /*Pociones*/
    const totalPociones = document.getElementById("contenedorpotions");
    totalPociones.innerHTML = "";
    document.getElementById("ordenselector").value = "";
    document.getElementById("busquedaPotions").value = "";

  });
});


