import { cid, container } from '..';
import { resetContainer } from '../lib/container';
import { generateIdOfDependency } from '../lib/id.helper';
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
    test('should be able to register a dependency as parameter with the same name in lowercase Dummy -> dummy', () => {
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
        constructor(@inject() private dummy: IDummy) {}

        public test(): string {
          return this.dummy.example();
        }
      }

      container.addSingleton<IOtherDummy>(OtherDummy);
      generateIdOfDependency(OtherDummy);
      const dependency = container.get<IOtherDummy>(cid.OtherDummy);

      expect(dependency.test()).toBe('example');
      resetContainer();
    });

    // test('should be able to register a dependency as parameter with the same name in lowercase with underscore Dummy -> _dummy', () => {
    //   interface IDummy {
    //     example(): string;
    //   }

    //   interface IOtherDummy {
    //     test(): string;
    //   }

    //   class Dummy implements IDummy {
    //     public example(): string {
    //       return 'example';
    //     }
    //   }

    //   class OtherDummy implements IOtherDummy {
    //     constructor(@inject() private _dummy: IDummy) {}

    //     public test(): string {
    //       return this._dummy.example();
    //     }
    //   }

    //   container.addSingleton<IDummy>(Dummy);
    //   container.addSingleton<IOtherDummy>(OtherDummy);
    //   generateIdOfDependency(OtherDummy);
    //   const dependency = container.get<IOtherDummy>(cid.OtherDummy);

    //   expect(dependency.test()).toBe('example');
    //   resetContainer();
    // });

    // test('should be able to register a dependency as parameter with the same name case insensitive Dummy -> _DuMmY', () => {
    //   interface IDummy {
    //     example(): string;
    //   }

    //   interface IOtherDummy {
    //     test(): string;
    //   }

    //   class Dummy implements IDummy {
    //     public example(): string {
    //       return 'example';
    //     }
    //   }

    //   class OtherDummy implements IOtherDummy {
    //     constructor(@inject() private _DuMmY: IDummy) {}

    //     public test(): string {
    //       return this._DuMmY.example();
    //     }
    //   }

    //   container.addSingleton<IDummy>(Dummy);
    //   container.addSingleton<IOtherDummy>(OtherDummy);
    //   generateIdOfDependency(OtherDummy);
    //   const dependency = container.get<IOtherDummy>(cid.OtherDummy);

    //   expect(dependency.test()).toBe('example');
    //   resetContainer();
    // });
  });
});
