
/* Traer data desde el json para filtrado*/

export const baseDatos = () => {
  console.log("base de datos");
  fetch('./data/harrypotter/harry.json')
    .then(response => response.json())
    .then(data => {

      let spells = data['spells']
      let potions = data['potions']
      let characters = data['characters']
      let funfacts = data['funFacts']
      let books = data['books']



      /*Presentacion de la informacion hechizos */
      const datosInicialesSpells = spells.map(spell => {
        return `<div class = "spellitem"> 
        <strong>Name:</strong> ${spell.name} <br>
        <strong>Spell type:</strong> ${spell.spell_type} <br>
        
        <strong>Mention:</strong> ${spell.mention} <br>
        <strong>Other Name:</strong> ${spell.other_name} </div>`;
      }).join("");
      let contenedorspells = document.getElementById("contenedorspells");
      contenedorspells.innerHTML = datosInicialesSpells;



      /*Presentacion de la informacion casas de Hogwarts */
      const datosInicialesHouses = characters.map(character => {
        return `<div class = "characterItem"> 
          <strong>Name:</strong> ${character.name} <br>    
          <strong>Birth:</strong> ${character.birth} <br>
          <strong>House:</strong> ${character.house} <br>
          <strong>Associated Groups:</strong> ${character.associated_groups} <br>
          <strong>Books featured in:</strong> ${character.books_featured_in} <br>
           </div>`;
      }).join("");
      const contenedorhouse = document.getElementById("contenedorhouse");
      contenedorhouse.innerHTML = datosInicialesHouses;

      /*Presentacion de la informacion pociones */
      const datosInicialesPotions = potions.map(potion => {
        return `<div class = "potionItem"> 
        <strong>Name:</strong> ${potion.name} <br>    
        <strong>Description:</strong> ${potion.description} <br>
         </div>`;
      }).join("");
      const contenedorPotions = document.getElementById("contenedorpotions");
      contenedorPotions.innerHTML = datosInicialesPotions;

      // traer la información de fun-facts

      const mostrarfunFacts = funfacts.map(funfact => {
        return `<div class="funfacts" id="funfacts">
        <div class="card-funfact" id="card-funfact">
        <h2>${funfact.type}</h2>
        <p>${funfact.content}</p>
        </div>
        </div>`;
      }).join("");
      const card_funfact = document.getElementById("all-funfacts");
      card_funfact.innerHTML = mostrarfunFacts;

      // traer la información de books

      const mostrarbooks = books.map(book => {
        return `
        <div class="book-card">
          <div class="book-card__cover">
            <div class="book-card__book">
            <div class="book-card__book-front">
              <img src="" alt="" class=".book-card__img">
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
      }).join("");
      const all_books = document.getElementById("all-books");
      all_books.innerHTML = mostrarbooks;

      /*Presentacion de datos hechizos*/

      const cantidadHechizos = spells.reduce(function (counts, spell) {
        if (spell.spell_type !== null) {
          counts[spell.spell_type] = (counts[spell.spell_type] || 0) + 1;
        }
        return counts;
      }, {});
      console.log(cantidadHechizos)

      /*Presentacion de datos Casas de Hogwarts*/

      const cantidadcharacters = characters.reduce(function (counts, character) {
        if (character.house !== null) {
          counts[character.house] = (counts[character.house] || 0) + 1;
        }
        return counts;
      }, {});
      console.log(cantidadcharacters)

      const cantidadspecies = characters.reduce(function (counts, character) {
        if (character.species !== null) {
          counts[character.species] = (counts[character.species] || 0) + 1;
        }
        return counts;
      }, {});
      console.log(cantidadspecies)


      const cantidadshaircolor = characters.reduce(function (counts, character) {
        if (character.hair_color !== null) {
          counts[character.hair_color] = (counts[character.hair_color] || 0) + 1;
        }
        return counts;
      }, {});
      console.log(cantidadshaircolor)


      /*Filtro por tipos de Hechizos */
      const filtro = document.getElementById("informacion");
      filtro.addEventListener("change", () => {
        const valorFiltro = filtro.value;
        const resultados = spells.filter((spell) => {
          if (valorFiltro === "") {
            return true;
          } else {
            return spell.spell_type === valorFiltro;
          }
        });
        const resultadoDatos = resultados.map(spell => {
          return `<div class = "spellitem"> 
          <strong>Name:</strong> ${spell.name} <br>
          <strong>Spell type:</strong> ${spell.spell_type} <br>
          
          <strong>Mention:</strong> ${spell.mention} <br>
          <strong>Other Name:</strong> ${spell.other_name} </div>`;
        }).join("");
        const totalResultados = document.getElementById("contenedorspells");
        totalResultados.innerHTML = resultadoDatos;
      });

      /*Buscador Hechizos*/
      const busquedaHechizo = document.getElementById("busquedaSpell1");
      busquedaHechizo.addEventListener("keyup", () => {
        const busqueda = busquedaHechizo.value;
        const hallazgo = spells.filter((spell) => {
          if (busqueda === "") {
            return true;
          } else {
            return spell.name.toLowerCase().includes(busqueda.toLowerCase()); /* Agregar opciones del buscador*/
          }
        });
        const hallazgoFinal = hallazgo.map(spell => {
          return `<div class = "spellitem"> 
          <strong>Name:</strong> ${spell.name} <br>
          <strong>Spell type:</strong> ${spell.spell_type} <br>
          <strong>Mention:</strong> ${spell.mention} <br>
          <strong>Other Name:</strong> ${spell.other_name} </div>`;
        }).join("");
        const finalSpell = document.getElementById("contenedorspells");
        if (hallazgoFinal === "") {
          finalSpell.innerHTML = `<div class="final">No se encontró información</div>`;
        } else {
          finalSpell.innerHTML = hallazgoFinal;
        }
      });


      /*Filtro por tipos de casas de Hogwarts */
      const casasH = document.getElementById("ordencasas");
      casasH.addEventListener("change", () => {
        const valorcasasH = casasH.value;
        const resultadosHogwarts = characters.filter((character) => {
          if (valorcasasH === "") {
            return true;
          } else {
            return character.house === valorcasasH;
          }
        });
        const resultadoDatos = resultadosHogwarts.map(character => {
          return `<div class = "characterItem"> 
          <strong>Name:</strong> ${character.name} <br>    
          <strong>Birth:</strong> ${character.birth} <br>
          <strong>House:</strong> ${character.house} <br>
          <strong>Associated Groups:</strong> ${character.associated_groups} <br>
          <strong>Books featured in:</strong> ${character.books_featured_in} <br>
           </div>`;
        }).join("");
        const totalResultadosCasas = document.getElementById("contenedorhouse");
        totalResultadosCasas.innerHTML = resultadoDatos;
      });

      /*Buscador casas de Hogwarts*/
      const busquedaCasasHogwarts = document.getElementById("busquedaHouse");
      busquedaCasasHogwarts.addEventListener("input", () => {
        const CasasHogwarts = busquedaCasasHogwarts.value;
        const hallazgoHogwarts = characters.filter((character) => {
          characters
          if (CasasHogwarts === "") {
            return true;
          } else {
            return character.name.toLowerCase().includes(CasasHogwarts.toLowerCase()); /* Agregar opciones del buscador*/
          }
        });
        const hallazgoFinalHogwarts = hallazgoHogwarts.map(character => {
          return `<div class = "characterItem"> 
          <strong>Name:</strong> ${character.name} <br>    
          <strong>Birth:</strong> ${character.birth} <br>
          <strong>House:</strong> ${character.house} <br>
          <strong>Associated Groups:</strong> ${character.associated_groups} <br>
          <strong>Books featured in:</strong> ${character.books_featured_in} <br>
           </div>`;
        }).join("");
        const finalcharacter = document.getElementById("contenedorhouse");
        if (hallazgoFinalHogwarts === "") {
          finalcharacter.innerHTML = `<div class="final">No se encontró información</div>`;
        } else {
          finalcharacter.innerHTML = hallazgoFinalHogwarts;
        }
      });

      /*Ordenado de pociones ascendente y descendente */
      const orden = document.getElementById("ordenselector");
      orden.addEventListener("change", () => {
        const valorOrden = orden.value;
        let pocionesOrdenadas = JSON.parse(JSON.stringify(potions)); /*Copia profunda de data json*/
        if (valorOrden != '') {
          pocionesOrdenadas = pocionesOrdenadas.sort((a, b) => {           /*Ascendente*/ /*Sort modifica el arreglo sobre el que actua*/
            return a.name.localeCompare(b.name)
          });

          if (valorOrden === 'Descendente') {
            pocionesOrdenadas = pocionesOrdenadas.reverse()           /*Descendente*/
          }
        }

        const resultadosOrdenados = pocionesOrdenadas.map(potion => {
          return `<div class = "potionItem"> 
          <strong>Name:</strong> ${potion.name} <br>    
          <strong>Description:</strong> ${potion.description} <br>
           </div>`;
        }).join("");
        const totalfinalOrden = document.getElementById("contenedorpotions");
        totalfinalOrden.innerHTML = resultadosOrdenados;

      });

      /* Buscador Pociones*/
      const busquedaPociones = document.getElementById("busquedaPotions");
      busquedaPociones.addEventListener("input", () => {
        const encuentro = busquedaPociones.value;
        const busquedaP = potions.filter((potion) => {
          if (encuentro === "") {
            return true;
          } else {
            return potion.name.toLowerCase().includes(encuentro.toLowerCase()); /* Agregar opciones del buscador*/
          }
        });
        const encuentroFinal = busquedaP.map(potion => {
          return `<div class = "potionItem"> 
          <strong>Name:</strong> ${potion.name} <br>    
          <strong>Description:</strong> ${potion.description} <br>
           </div>`;
        }).join("");
        const finalPotion = document.getElementById("contenedorpotions");
        if (encuentroFinal === "") {
          finalPotion.innerHTML = `<div class="final">No se encontró información</div>`;
        } else {
          finalPotion.innerHTML = encuentroFinal;
        }
      }
      )


    })


}







