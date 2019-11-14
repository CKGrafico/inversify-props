import { inject as __inject, injectable as __injectable } from 'inversify';
import { cid, container } from '..';
/**
 * @param key the name of the property,
 * If the interface is IMyService the key must be myService or _myService
 */
const keyToId = (key: string) => {
  if (!key) {
    throw new Error('A key is necessary to load this interface');
  }

  const prefix = 'I' + key[0].toUpperCase();
  return prefix + key.slice(1).replace('_', '');
};

export let DependencyId: { [key: string]: string | symbol; } = {};

export function cacheId(customId: string | symbol, id: string): string | symbol {
  if (customId) {
    DependencyId[customId.toString()] = customId;
    return customId;
  }

  DependencyId[id] = DependencyId[id] || Symbol(id);
  return DependencyId[id];
}

/**
 * Decorator to inject dependencies in components or classes
 * @param id optional id, could be auto generated with prop name
 */
export function Inject(id?: string | symbol) {
  return (target: any, targetKey: string, index?: number) => {

    // Is parameter decorator
    if (typeof index === 'number') {
      const args = target.toString().match(/[constructor|function].*?\(([^)]*)\)/);

      if (!args) {
        throw new Error(`Cannot find constructor in this class ${target.name}`);
      }

      const listOfArgs = args[1].split(',').map(arg => (arg.replace(/\/\*.*\*\//, '').trim())).filter(x => x);
      const key = listOfArgs[index];
      const dependencyId = cacheId(id as string, injectId(key));

      return __inject(dependencyId)(target, targetKey, index);
    }

    // Is property decorator
    // Create id
    const generatedId = cacheId(id as string, injectId(targetKey));
    const realCid = typeof generatedId === 'symbol' || id ? generatedId : cid[generatedId];

    // For Components
    Reflect.deleteProperty(target, targetKey);
    Reflect.defineProperty(target, targetKey, {
      get() {
        return container.get(realCid);
      },
      set(value) {
        return value;
      }
    });

    // For Services
    return __inject(realCid)(target, targetKey);
  };
}

export const inject = Inject;

/**
 * Creates an identifier meanwhile we cannot create with interfaces
 * @param target the class to generate the name
 */
export function injectId(target: any): string {
  return keyToId(target.name || target);
}

/**
 * Decorator to inject dependencies for testing purposes
 * @param target: the component
 * @param key: the injected class
 * @param mock: the object mock
 * @example
 * mockInject(wrapper.vm, 'citiesService', {
 *   remove: x => x + 100000
 * })
 */
export function mockInject(target: any, key: any, mock: any) {
  console.log('this method is going to be deprecated soon, use mockDependency and check docs.');

  const getter = () => {
    return mock;
  };

  Reflect.deleteProperty[key];
  Reflect.defineProperty(target, key, {
    get: getter,
    set: x => x
  });
}

/**
 * Help Injectable to cache id if necessary
 */
export function injectable(customId?: string) {
  return function (target: any) {
    cacheId(customId, injectId(target));
    return __injectable()(target);
  };
}

/**
 * Unbind all dependencies from container
 */
export function resetContainer() {
  container.unbindAll();
}

/**
 * After container is generated, mock an existing dependency as Singleton
 */
export function mockSingleton<T>(id: string | symbol, to: {
  new (...args: any[]): T;
}) {
  container.unbind(id);
  container.addSingleton<T>(to, id);
}

/**
 * After container is generated, mock an existing dependency as Transient
 */
export function mockTransient<T>(id: string | symbol, to: {
  new (...args: any[]): T;
}) {
  container.unbind(id);
  container.addTransient<T>(to, id);
}

/**
 * After container is generated, mock an existing dependency as Request
 */
export function mockRequest<T>(id: string | symbol, to: {
  new (...args: any[]): T;
}) {
  container.unbind(id);
  container.addRequest<T>(to, id);
}

