import {
  filterByName,
  changeInfo,
  changeHouse,
  getHouse,
  orderByValue,
} from "./data.js";
import data from "./data/harrypotter/harry.js";

const dataSpells = data.spells;
const dataCharacter = data.characters;
const dataPotions = data.potions;

export const baseDatos = () => {
  console.log("base de datos");
  fetch("./data/harrypotter/harry.json")
    .then((response) => response.json())
    .then((data) => {
      //TODO: Declarando variables
      let spells = data["spells"];
      let potions = data["potions"];
      let characters = data["characters"];
      let funfacts = data["funFacts"];
      let books = data["books"];
      /*--------------------------------------------------------------------------------------------------------*/
      //! traer la información de spells
      const datosIniciales = spells
        .map((spell) => {
          let html = '<div class="spellitem">';
          html += `<strong>Name:</strong> ${
            spell.name !== null ? spell.name : "No existe información"
          }<br>`;
          html += `<strong>Spell type:</strong> ${
            spell.spell_type !== null
              ? spell.spell_type
              : "No existe información"
          }<br>`;
          html += `<strong>Mention:</strong> ${
            spell.mention !== null ? spell.mention : "No existe información"
          }<br>`;
          html += `<strong>Other Name:</strong> ${
            spell.other_name !== null
              ? spell.other_name
              : "No existe información"
          }`;
          html += "</div>";
          return html;
        })
        .join("");
      const contenedorspells = document.getElementById("contenedorspells");
      contenedorspells.innerHTML = datosIniciales;

      //! traer la información de fun-facts
      const mostrarfunFacts = funfacts
        .map((funfact) => {
          return `<div class="funfacts" id="funfacts">
        <div class="card-funfact" id="card-funfact">
        <h2>${funfact.type}</h2>
        <p>${funfact.content}</p>
        </div>
        </div>`;
        })
        .join("");
      const card_funfact = document.getElementById("all-funfacts");
      card_funfact.innerHTML = mostrarfunFacts;

      //! traer la información de books
      const mostrarbooks = books
        .map((book) => {
          return `
        <div class="book-card">
          <div class="book-card__cover">
            <div class="book-card__book">
            <div class="book-card__book-front">
              <img src="${book.images}" alt="" class=".book-card__img">
              </div>
            <div class="book-card__book-back"></div>
              <div class="book-card__book-side"></div>
              </div>
              <div class="book-card__title">
                ${book.title} <br>${book.releaseDay}              
              </div>
              <div class="book-card__author">
                <p>${book.description}</p>
              </div>
            </div>
          </div>`;
        })
        .join("");
      const all_books = document.getElementById("all-books");
      all_books.innerHTML = mostrarbooks;

      //! Traer información de los personajes
      const datosInicialesHouses = characters
        .map((character) => {
          let html = '<div class="characterItem">';
          html += `<strong>Name:</strong> ${
            character.name !== null ? character.name : "No existe información"
          }<br>`;
          html += `<strong>Birth:</strong> ${
            character.birth !== null ? character.birth : "No existe información"
          }<br>`;
          html += `<strong>House:</strong> ${
            character.house !== null ? character.house : "No existe información"
          }<br>`;
          html += `<strong>Associated Groups:</strong> ${
            character.associated_groups !== null
              ? character.associated_groups
              : "No existe información"
          }<br>`;
          html += `<strong>Books featured in:</strong> ${
            character.books_featured_in !== null
              ? character.books_featured_in
              : "No existe información"
          }<br>`;
          html += "</div>";
          return html;
        })
        .join("");
      const contenedorhouse = document.getElementById("contenedorhouse");
      contenedorhouse.innerHTML = datosInicialesHouses;

      //! Presentacion de la informacion pociones
      const datosInicialesPotions = potions
        .map((potion) => {
          return `<div class="potionItem">
          <strong>Name:</strong> ${
            potion.name !== null ? potion.name : "no existe información"
          }<br>
          <strong>Description:</strong> ${
            potion.description !== null
              ? potion.description
              : "no existe información"
          }<br>
        </div>`;
        })
        .join("");

      const contenedorPotions = document.getElementById("contenedorpotions");
      contenedorPotions.innerHTML = datosInicialesPotions;

      /*--------------------------------------------------------------------------------------------------------*/
      /*Presentacion de datos */

      //? Separador para probar la función

      let result = dataCharacter.filter((miembro) => miembro.gender == "Male");
      let result02 = dataCharacter.filter(
        (miembro) => miembro.gender == "Female"
      );

      const cantidad01 = result.reduce(function (counts, character) {
        if (character.gender !== null) {
          counts[character.gender] = (counts[character.gender] || 0) + 1;
        }
        return counts;
      }, {});

      const cantidadr02 = result02.reduce(function (counts, character) {
        if (character.gender !== null) {
          counts[character.gender] = (counts[character.gender] || 0) + 1;
        }
        return counts;
      }, {});

      const totalResult01 = Object.values(cantidad01);
      const totalResult02 = Object.values(cantidadr02);

      /*filter*/
      console.log("Personajes femeninos", totalResult01);
      const infoMostrar = document.getElementById("textValue01");
      infoMostrar.textContent = `Personajes femeninos: ${totalResult01}`;

      const infoMostrar02 = document.getElementById("textValue02");
      infoMostrar02.textContent = `Personajes masculinos: ${totalResult02}`;

      //* Filtrado por tipo de Hechizo -> Section 02
      const filtro = document.getElementById("informacion");
      filtro.addEventListener("change", () => {
        const valorFiltro = filtro.value;
        const resultados = changeInfo(dataSpells, valorFiltro);
        const resultadoDatos = resultados
          .map((spell) => {
            return `<div class = "spellitem"> 
          <strong>Name:</strong> ${spell.name} <br>
          <strong>Spell type:</strong> ${spell.spell_type} <br>
          <strong>Mention:</strong> ${spell.mention} <br>
          <strong>Other Name:</strong> ${spell.other_name} </div>`;
          })
          .join("");
        const totalResultados = document.getElementById("contenedorspells");
        totalResultados.innerHTML = resultadoDatos;
      });

      //* Buscador ingresando el  nombre del hechizo -> Section 02
      const busquedaHechizo = document.getElementById("busquedaSpell1");
      busquedaHechizo.addEventListener("input", () => {
        const busqueda = busquedaHechizo.value.toLowerCase();
        const hallazgo = filterByName(dataSpells, busqueda);
        const hallazgoFinal = hallazgo
          .map((spell) => {
            let html = '<div class="spellitem">';
            html += `<strong>Name:</strong> ${spell.name !== null ? spell.name : 'No existe información'}<br>`;
            html += `<strong>Spell type:</strong> ${spell.spell_type !== null ? spell.spell_type : 'No existe información'}<br>`;
            html += `<strong>Mention:</strong> ${spell.mention !== null ? spell.mention : 'No existe información'}<br>`;
            html += `<strong>Other Name:</strong> ${spell.other_name !== null ? spell.other_name : 'No existe información'}`;
            html += '</div>';
            return html;
          })
          .join('');
        const finalSpell = document.getElementById("contenedorspells");
        if (hallazgoFinal === "") {
          finalSpell.innerHTML = `<div class="final">No se encontró información</div>`;
        } else {
          finalSpell.innerHTML = hallazgoFinal;
        }
        return hallazgo;
      });
      //* Filtrado por casas para personajes -> Section 04
      const casasH = document.getElementById("ordencasas");
      casasH.addEventListener("change", () => {
        const valorcasasH = casasH.value;
        const resultadosHogwarts = changeHouse(dataCharacter, valorcasasH);
        const resultadoDatos = resultadosHogwarts
          .map((character) => {
            return `<div class = "characterItem">
          <strong>Name:</strong> ${character.name} <br>
          <strong>Birth:</strong> ${character.birth} <br>
          <strong>House:</strong> ${character.house} <br>
          <strong>Associated Groups:</strong> ${character.associated_groups} <br>
          <strong>Books featured in:</strong> ${character.books_featured_in} <br>
           </div>`;
          })
          .join("");
        const totalResultadosCasas = document.getElementById("contenedorhouse");
        totalResultadosCasas.innerHTML = resultadoDatos;
      });

      //* Buscador de personahes -> Section 04
      const busquedaCasasHogwarts = document.getElementById("busquedaHouse");
      busquedaCasasHogwarts.addEventListener("input", () => {
        const CasasHogwarts = busquedaCasasHogwarts.value;
        const hallazgoHogwarts = getHouse(dataCharacter, CasasHogwarts);
        const hallazgoFinalHogwarts = hallazgoHogwarts
          .map((character) => {
            let html = '<div class="characterItem">';
            html += `<strong>Name:</strong> ${character.name !== null ? character.name : 'No existe información'}<br>`;
            html += `<strong>Birth:</strong> ${character.birth !== null ? character.birth : 'No existe información'}<br>`;
            html += `<strong>House:</strong> ${character.house !== null ? character.house : 'No existe información'}<br>`;
            html += `<strong>Associated Groups:</strong> ${character.associated_groups !== null ? character.associated_groups : 'No existe información'}<br>`;
            html += `<strong>Books featured in:</strong> ${character.books_featured_in !== null ? character.books_featured_in : 'No existe información'}<br>`;
            html += '</div>';
            return html;
          })
          .join('');
        const finalcharacter = document.getElementById("contenedorhouse");
        if (hallazgoFinalHogwarts === "") {
          finalcharacter.innerHTML = `<div class="final">No se encontró información</div>`;
        } else {
          finalcharacter.innerHTML = hallazgoFinalHogwarts;
        }
      });

      //* Utilizando sort por Descendente y Ascendente
      const orden = document.getElementById("ordenselector");
      orden.addEventListener("change", () => {
        const valorOrden = orden.value;
        let pocionesOrdenadas = JSON.parse(JSON.stringify(potions));
        pocionesOrdenadas = orderByValue(dataPotions, valorOrden);
        const resultadosOrdenados = pocionesOrdenadas
          .map((potion) => {
            return `<div class = "potionItem">
          <strong>Name:</strong> ${potion.name} <br>
          <strong>Description:</strong> ${potion.description} <br>
           </div>`;
          })
          .join("");
        const totalfinalOrden = document.getElementById("contenedorpotions");
        totalfinalOrden.innerHTML = resultadosOrdenados;
      });

      //* Buscador de pociones
      const busquedaPociones = document.getElementById("busquedaPotions");
      busquedaPociones.addEventListener("input", () => {
        const encuentro = busquedaPociones.value;
        const busquedaP = filterByName(dataPotions, encuentro);

        const encuentroFinal = busquedaP
          .map((potion) => {
            return `<div class = "potionItem">
          <strong>Name:</strong> ${potion.name} <br>
          <strong>Description:</strong> ${potion.description} <br>
           </div>`;
          })
          .join("");
        const finalPotion = document.getElementById("contenedorpotions");
        if (encuentroFinal === "") {
          finalPotion.innerHTML = `<div class="final">No se encontró información</div>`;
        } else {
          finalPotion.innerHTML = encuentroFinal;
        }
      });

      //Finalizacion de porcentajes
      let circularProgress = document.querySelector(".circular-progress"),
        progressValue = document.querySelector(".progress-value");

      let progressStartValue = 0,
        progressEndValue = Math.round((totalResult01 * 100) / 756),
        speed = 100;

      let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6
          }deg, #ededed 0deg)`;

        if (progressStartValue == progressEndValue) {
          clearInterval(progress);
        }
      }, speed);
      //? termina todo
      let circularProgress02 = document.querySelector(".circular-progress02"),
        progressValue02 = document.querySelector(".progress-value02");

      let progressStartValue02 = 0,
        progressEndValue02 = Math.round((totalResult02 * 100) / 756),
        speed02 = 100;

      let progress02 = setInterval(() => {
        progressStartValue02++;

        progressValue02.textContent = `${progressStartValue02}%`;
        circularProgress02.style.background = `conic-gradient(#7d2ae8 ${progressStartValue02 * 3.6
          }deg, #ededed 0deg)`;

        if (progressStartValue02 == progressEndValue02) {
          clearInterval(progress02);
        }
      }, speed02);
    });
};
/*---------
/*--------------------------------------------------------------------------------------------------------*/

/* Siguiente sección*/

let botones = document.querySelectorAll(".navigation button");
botones.forEach(function (elemento) {
  elemento.addEventListener("click", (event) => {
    let seccion = event.currentTarget.dataset.section;
    let secciones = document.getElementsByTagName("section");

    if (
      seccion === "section2" ||
      seccion === "section3" ||
      seccion === "section4" ||
      seccion === "section5" ||
      seccion === "section6"
    ) {
      /* Llamor la funcion desde data js*/
      baseDatos();
    }
    if (seccion != "section1") {
      // Ocultar texto de los botones
      document.querySelectorAll("button span").forEach((span) => {
        span.style.display = "none";
      });
    } else {
      document.querySelectorAll("button span").forEach((span) => {
        span.style.display = "inline";
      });
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



//? termina todo
