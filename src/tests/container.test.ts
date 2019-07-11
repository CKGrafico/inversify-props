import 'reflect-metadata';

import { injectable } from '..';
import { Container } from '../lib/container';

interface IExampleService {
  get(): boolean;
}

@injectable()
class ExampleService implements IExampleService {
  public get(): boolean {
    return true;
  }
}

let container: Container;
describe('Container', () => {

  beforeEach(() => {
    container = new Container();
  });

  describe('When addTransient', () => {
    test('if has no id should create random id', () => {
      container.addTransient<IExampleService>(ExampleService);

      const okId = 'IExampleService';
      const badId = 'example';

      expect(() => container.get<IExampleService>(okId)).not.toThrow();
      expect(() => container.get<IExampleService>(badId)).toThrow();
    });

    test('if has id should use the id', () => {
      const id = 'randomId';
      container.addTransient<IExampleService>(ExampleService, id);

      const okId = id;
      const badId = 'IExampleService';

      expect(() => container.get<IExampleService>(okId)).not.toThrow();
      expect(() => container.get<IExampleService>(badId)).toThrow();
    });
  });

  describe('When addSingleton', () => {
    test('if has no id should create random id', () => {
      container.addSingleton<IExampleService>(ExampleService);

      const okId = 'IExampleService';
      const badId = 'example';

      expect(() => container.get<IExampleService>(okId)).not.toThrow();
      expect(() => container.get<IExampleService>(badId)).toThrow();
    });

    test('if has id should use the id', () => {
      const id = 'randomId';
      container.addSingleton<IExampleService>(ExampleService, id);

      const okId = id;
      const badId = 'IExampleService';

      expect(() => container.get<IExampleService>(okId)).not.toThrow();
      expect(() => container.get<IExampleService>(badId)).toThrow();
    });
  });

  describe('When addRequest', () => {
    test('if has no id should create random id', () => {
      container.addRequest<IExampleService>(ExampleService);

      const okId = 'IExampleService';
      const badId = 'example';

      expect(() => container.get<IExampleService>(okId)).not.toThrow();
      expect(() => container.get<IExampleService>(badId)).toThrow();
    });

    test('if has id should use the id', () => {
      const id = 'randomId';
      container.addRequest<IExampleService>(ExampleService, id);

      const okId = id;
      const badId = 'IExampleService';

      expect(() => container.get<IExampleService>(okId)).not.toThrow();
      expect(() => container.get<IExampleService>(badId)).toThrow();
    });
  });
});
