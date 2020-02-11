import { addIdToCache, generateIdNameFromConstructor, generateIdOfDependency, idsCache } from '../lib/id.helper';

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
    test('should return a Symbol id', () => {
      interface IDummy {}

      class Dummy implements IDummy {}

      const id = null;

      const generatedId = generateIdOfDependency<IDummy>(Dummy, id);

      expect(generatedId.toString()).toBe('Symbol(Dummy)');
      expect(typeof generatedId).toBe('symbol');
    });
  });

  describe('When adds new id to the cache', () => {
    test('should cache it and return the same value', () => {
      const id = 'test id';
      const name = 'test';

      const cachedId = addIdToCache(id, name);

      expect(idsCache[name]).toBe(id);
      expect(cachedId).toBe(id);
    });

    test('should not cache it id exist', () => {
      const id = 'test id';
      const name = 'test';
      const fakevalue = 'fake';

      addIdToCache(id, name);
      idsCache[name] = fakevalue;
      const cachedAgainId = addIdToCache(id, name);

      expect(cachedAgainId).not.toBe(id);
      expect(cachedAgainId).toBe(fakevalue);
    });
  });

  describe('When generate name is called', () => {
    test('should return the constructor name', () => {
      class Dummy {}

      expect(generateIdNameFromConstructor(Dummy)).toBe('DUMMY');
    });
  });
});
