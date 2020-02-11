import { cid, container } from '..';
import { resetContainer } from '../lib/container';
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
    test('should be able to register a dependency as parameter with the same name in case insensitive Dummy -> duMMy', () => {
      interface IDummy {
        example(): string;
      }

      class Dummy implements IDummy {
        public example(): string {
          return 'example';
        }
      }

      container.addSingleton<IDummy>(Dummy);

      interface IOtherDummy {
        test(): string;
      }

      class OtherDummy implements IOtherDummy {
        constructor(@inject() private duMMy: IDummy) {}

        public test(): string {
          return this.duMMy.example();
        }
      }

      container.addSingleton<IOtherDummy>(OtherDummy);
      console.log(cid);
      // { Dummy: Symbol(Dummy), Otherdummy: Symbol(OtherDummy) }
      const dependency = container.get<IOtherDummy>(cid.OtherDummy);

      expect(dependency.test()).toBe('example');
      resetContainer();
    });
  });
});
