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

      //! traer la información de spells
      const datosIniciales = spells
        .map((spell) => {
          return `<div class = "spellitem"> 
        <strong>Name:</strong> ${spell.name} <br>
        <strong>Spell type:</strong> ${spell.spell_type} <br>
        
        <strong>Mention:</strong> ${spell.mention} <br>
        <strong>Other Name:</strong> ${spell.other_name} </div>`;
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
                ${book.title}
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
          return `<div class = "characterItem">
          <strong>Name:</strong> ${character.name} <br>
          <strong>Birth:</strong> ${character.birth} <br>
          <strong>House:</strong> ${character.house} <br>
          <strong>Associated Groups:</strong> ${character.associated_groups} <br>
          <strong>Books featured in:</strong> ${character.books_featured_in} <br>
           </div>`;
        })
        .join("");
      const contenedorhouse = document.getElementById("contenedorhouse");
      contenedorhouse.innerHTML = datosInicialesHouses;

      //! Presentacion de la informacion pociones
      const datosInicialesPotions = potions
        .map((potion) => {
          return `<div class = "potionItem">
        <strong>Name:</strong> ${potion.name} <br>
        <strong>Description:</strong> ${potion.description} <br>
         </div>`;
        })
        .join("");
      const contenedorPotions = document.getElementById("contenedorpotions");
      contenedorPotions.innerHTML = datosInicialesPotions;

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
            return `<div class = "spellitem"> 
            <strong>Name:</strong> ${spell.name} <br>
            <strong>Spell type:</strong> ${spell.spell_type} <br>
            <strong>Mention:</strong> ${spell.mention} <br>
            <strong>Other Name:</strong> ${spell.other_name} </div>`;
          })
          .join("");

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
            return `<div class = "characterItem">
          <strong>Name:</strong> ${character.name} <br>
          <strong>Birth:</strong> ${character.birth} <br>
          <strong>House:</strong> ${character.house} <br>
          <strong>Associated Groups:</strong> ${character.associated_groups} <br>
          <strong>Books featured in:</strong> ${character.books_featured_in} <br>
           </div>`;
          })
          .join("");
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

      //? termina todo
    });
};

const botones = document.querySelectorAll(".navigation button");
botones.forEach(function (elemento) {
  elemento.addEventListener("click", (event) => {
    let seccion = event.currentTarget.dataset.section;
    let secciones = document.getElementsByTagName("section");

    if (
      seccion === "section1" ||
      seccion === "section2" ||
      seccion === "section3" ||
      seccion === "section4" ||
      seccion === "section5"
    ) {
      /* Llamor la funcion desde data js*/
      baseDatos();
    }

    if (seccion == "section6") {
      /* Llamor la funcion desde data js*/
      baseDatos();
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

const acordeon = document.getElementsByClassName("cont-acordeon");

for (let i = 0; i < acordeon.length; i++) {
  acordeon[i].addEventListener("click", function () {
    this.classList.toggle("activa");
  });
}
