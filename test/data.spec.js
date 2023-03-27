import { baseDatos } from '../src/data';




describe('baseDatos', () => {
  test('debe cargar los datos correctamente', () => {
    // Arrange
    const expectedSpells = ['Wingardium Leviosa', 'Expelliarmus', 'Lumos'];
    const expectedPotions = ['Amortentia', 'Felix Felicis', 'Polyjuice Potion'];
    const expectedCharacters = ['Harry Potter', 'Hermione Granger', 'Ron Weasley'];
    const expectedFunFacts = ['The name "Hogwarts" comes from a plant.', 'Moaning Myrtle was based on a real person.'];
    const expectedBooks = ['Harry Potter and the Philosopher\'s Stone', 'Harry Potter and the Chamber of Secrets', 'Harry Potter and the Prisoner of Azkaban'];

    // Act
    return baseDatos().then(data => {
      // Assert
      expect(baseDatos).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith('./data/harrypotter/harry.json');
      expect(data.spells).toEqual(expectedSpells);
      expect(data.potions).toEqual(expectedPotions);
      expect(data.characters).toEqual(expectedCharacters);
      expect(data.funFacts).toEqual(expectedFunFacts);
      expect(data.books).toEqual(expectedBooks);
    });
  });
});
