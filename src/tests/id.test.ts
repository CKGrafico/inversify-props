import { generateIdOfDependency } from '../lib/id.helper';

describe('Id Helper', () => {
  describe('When generate Ids receives a Class with an Interface and an Id', () => {
    test('if the Id is an string should return the same Id', () => {
      interface IDummy {}

      class Dummy implements IDummy {}

      const id = 'testId';

      const generatedId = generateIdOfDependency<IDummy>(Dummy, id);

      expect(generatedId).toBe(id);
      expect(typeof generatedId).toBe('string');
    });

    test('if the Id is a symbol should return the same Id', () => {
      interface IDummy {}

      class Dummy implements IDummy {}

      const id = Symbol('testid');

      const generatedId = generateIdOfDependency<IDummy>(Dummy, id);

      expect(generatedId).toBe(id);
      expect(typeof generatedId).toBe('symbol');
    });
  });

  describe('When generate Ids receives a Class with an Interface and NOT an Id', () => {
    test('should return ____', () => {
      interface IDummy {}

      class Dummy implements IDummy {}

      const id = null;

      const generatedId = generateIdOfDependency<IDummy>(Dummy, id);

      expect(generatedId).toBe('___');
    });
  });
});
