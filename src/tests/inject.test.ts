import { inject, isParameterDecorator } from '../lib/inject.helper';

describe('Inject Helper', () => {
  describe('When index parameter is defined', () => {
    test('should be detected as parameter decorator if index is a number', () => {
      expect(isParameterDecorator(0)).toBe(true);
      expect(isParameterDecorator(1)).toBe(true);
      expect(isParameterDecorator(undefined)).toBe(false);
    });
  });

  describe('When is a parameter decorator', () => {
    test('should ___', () => {
      interface IDummy {}

      class Dummy implements IDummy {
        constructor(@inject() private test: IDummy) {}
      }

      const dummy = new Dummy({});
    });
  });
});
