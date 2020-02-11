import { addIdToCache, generateIdOfDependency, idsCache } from '../lib/id.helper';

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

      expect(idsCache[id].id).toBe(id);
      expect(idsCache[id].name).toBe(name);
      expect(cachedId.id).toBe(id);
      expect(cachedId.name).toBe(name);
    });

    test('should not cache it id exist', () => {
      const id = 'test id';
      const name = 'test';
      const fakevalue = 'fake';

      addIdToCache(id, name);
      idsCache[id].id = fakevalue;
      const cachedAgainId = addIdToCache(id, name);

      expect(cachedAgainId.id).not.toBe(id);
      expect(cachedAgainId.id).toBe(fakevalue);
    });
  });
});
