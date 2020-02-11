import { isParameterDecorator } from '../lib/inject.helper';

describe('Inject Helper', () => {
  describe('When index parameter is defined', () => {
    test('should be detected as parameter decorator if index is a number', () => {
      expect(isParameterDecorator(0)).toBe(true);
      expect(isParameterDecorator(1)).toBe(true);
      expect(isParameterDecorator(undefined)).toBe(false);
    });
  });

  // describe('When is a parameter decorator', () => {
  //   test('should be able to register a dependency as parameter', () => {
  //     interface IDummy {
  //       example(): string;
  //     }

  //     interface IOtherDummy {
  //       test(): string;
  //     }

  //     class Dummy implements IDummy {
  //       public example(): string {
  //         return 'example';
  //       }
  //     }

  //     class OtherDummy implements IOtherDummy {
  //       constructor(@inject() private paramnameisnoimportantanimore: IDummy) {}

  //       public test(): string {
  //         return this.paramnameisnoimportantanimore.example();
  //       }
  //     }

  //     container.addSingleton<IDummy>(Dummy);
  //     container.addSingleton<IOtherDummy>(OtherDummy);
  //     generateIdOfDependency(OtherDummy);
  //     const dependency = container.get<IOtherDummy>(cid.OtherDummy);

  //     expect(dependency.test()).toBe('example');
  //     resetContainer();
  //   });
  // });
});
