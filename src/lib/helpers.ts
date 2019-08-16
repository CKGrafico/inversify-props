import { container, cid } from '..';
import { injectable as __injectable, inject as __inject } from 'inversify';
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

export function cacheId(customId: string, id: string): string | symbol {
  if (customId) {
    DependencyId[customId] = customId;
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
    const generatedId = id || keyToId(targetKey);
    let realCid = typeof generatedId === 'symbol' ? generatedId : cid[generatedId];

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
