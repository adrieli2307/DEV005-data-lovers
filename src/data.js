// TODO: buscador de hechizos
export const filterByName = (spells, busqueda) => {
  if (spells === undefined || busqueda === undefined) return undefined;
  const hallazgo = spells.filter((spell) => {
    return (
      spell.name.toLocaleLowerCase().includes(busqueda) ===
      busqueda.toLocaleLowerCase().includes(busqueda)
    );
  });
  return hallazgo;
};


// TODO: filtrar por tipo de hechizo
export const changeInfo = (spells, valorspell) => {
  const resultados = spells.filter((spell) => {
    if (valorspell === "") {
      return true;
    } else {
      return spell.spell_type === valorspell;
    }
  });
  return resultados;
}
// TODO: filtro por tipo de casa
export const changeHouse = (characters, valorcasas) => {
  const resultadosHogwart = characters.filter((character) => {
    if (valorcasas === "") {
      return true;
    } else {
      return character.house === valorcasas;
    }
  });
  return resultadosHogwart;
};

// TODO: buscador de personajes
export const getHouse = (houses, valorhouse) => {
  const hallazgoCasas = houses.filter((house) => {
    return house.name.toLowerCase().includes(valorhouse.toLowerCase());
  });
  return hallazgoCasas;
};

// TODO: Ordenado de pociones ascendente y descendente
export const orderByValue = (valorOrden, pocionesOrdenadas) => {
  const orderValue = valorOrden.sort((a, b) => {
    if (pocionesOrdenadas === "Descendente") {
      return b.name.localeCompare(a.name);
    } else {
      return a.name.localeCompare(b.name);
    }

  });
  return orderValue;
};
