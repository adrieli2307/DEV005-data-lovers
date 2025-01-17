import {
  filterByName,
  changeInfo,
  changeHouse,
  getHouse,
  orderByValue,
} from "../src/data.js";

const dataspell = [
  {
    id: 7,
    name: "Alohomora",
    spell_type: "Charm",
  },
  {
    id: 59,
    name: "Confundo",
    spell_type: "Charm",
  },
  {
    id: 23,
    name: "Avada Kedavra",
    spell_type: "Curse",
  },
];

//TODO: Primer testeo
describe("Buscador de pociones", () => {
  it("Deberia retornar que es una función -> filterByName", () => {
    expect(typeof filterByName).toBe("function");
  });

  it("return undefined", () => {
    expect(filterByName()).toBe(undefined);
  });

  it("Deberia retornar el filtrado por nombres -> spells", () => {
    const resultspell = [
      {
        id: 7,
        name: "Alohomora",
        spell_type: "Charm",
      },
    ];
    expect(filterByName(dataspell, "Alohomora".toLowerCase())).toEqual(
      resultspell
    );
  });
});

//TODO: Segundo testeo
describe("Filtrar por tipo de hechizo", () => {
  it("Deberia retornar que es una función -> changeInfo", () => {
    expect(typeof changeInfo).toBe("function");
  });

  it("return undefined", () => {
    expect(changeInfo()).toBe(undefined);
  });

  it("Deberia retornar el arreglo que tenga como tipo Curse", () => {
    expect(changeInfo(dataspell, "Curse")).toEqual([
      {
        id: 23,
        name: "Avada Kedavra",
        spell_type: "Curse",
      },
    ]);
  });

  it("Deberia retornar un array vacio si no hay hechizos del tipo especificado", () => {
    expect(changeInfo(dataspell, "")).toEqual(dataspell);
  });
});

const dataCharacter = [
  {
    id: 50,
    name: "Sirius Black",
    house: "Gryffindor",
  },
  {
    id: 117,
    name: "Cedric Diggory",
    house: "Hufflepuff",
  },
  {
    id: 242,
    name: "Lestrange",
    house: "Slytherin",
  },
  {
    id: 367,
    name: "Newton Scamander",
    house: "Hufflepuff",
  },
  {
    id: 625,
    name: "Luna Lovegood",
    house: "Ravenclaw",
  },
];

//TODO: Tercer testeo
describe("Filtrar los personajes por casas", () => {
  it("Deberia retornar que es una función -> changeHouse", () => {
    expect(typeof changeHouse).toBe("function");
  });

  it("Deberia retornar el arreglo por cada tipo de casa", () => {
    expect(changeHouse(dataCharacter, "Slytherin")).toEqual([
      {
        id: 242,
        name: "Lestrange",
        house: "Slytherin",
      },
    ]);
  });
});

//TODO: Cuarto testeo
describe("Buscador de personajes", () => {
  it("Deberia retornar que es una función -> getHouse", () => {
    expect(typeof getHouse).toBe("function");
  });

  it("Deberia retornar el arreglo por cada tipo de casa", () => {
    expect(getHouse(dataCharacter, "Luna Lovegood")).toEqual([
      {
        id: 625,
        name: "Luna Lovegood",
        house: "Ravenclaw",
      },
    ]);
  });
});

const dataPotions = [
  {
    id: 3,
    name: "Amortentia",
  },
  {
    id: 31,
    name: "Cough Potion",
  },
  {
    id: 35,
    name: "Death potion",
  },
];

//TODO: Quinto testeo
describe("Ordenar pociones ascendente y descendente", () => {
  it("Deberia retornar que es una función -> orderByValue", () => {
    expect(typeof orderByValue).toBe("function");
  });

  it("Deberia retornar un arreglo de forma descendente -> orderByValue", () => {
    expect(orderByValue(dataPotions, "Descendente")).toEqual([
      {
        id: 35,
        name: "Death potion",
      },
      {
        id: 31,
        name: "Cough Potion",
      },
      {
        id: 3,
        name: "Amortentia",
      },
    ]);
  });

  it("Deberia retornar un arreglo de forma ascendente -> orderByValue", () => {
    expect(orderByValue(dataPotions, "Ascendente")).toEqual(dataPotions);
  });
});

/*
https://docs.google.com/spreadsheets/d/1YaWLbwXpdrczYi9LmtJ4sF-uae0PUq9GnUalvuw_HHw/edit?usp=sharing
*/
