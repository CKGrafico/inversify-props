import { container, cid } from '..';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import { Metadata } from 'inversify/lib/planning/metadata';
import { tagParameter } from 'inversify/lib/annotation/decorator_utils';

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
export function Inject(id?: string) {
  return (target: any, key: string) => {
    const generatedId = id || keyToId(key);

    const getter = () => {
      return container.get(cid[generatedId]);
    };

    Reflect.deleteProperty[key];
    Reflect.defineProperty(target, key, {
      get: getter,
    });
  };
}

/**
 * Decorator to inject dependencies in constructor using parameters
 * @param id optional id, could be auto generated with prop name
 */
export function inject(id?: string) {
  return function (target: any, targetKey: string, index: number): void {
    const args = target.toString().match(/constructor.*?\(([^)]*)\)/);

    if (!args) {
      throw new Error(`Cannot find constructor in this class ${target.name}`);
    }

    const listOfArgs = args[1].split(',').map(arg => (arg.replace(/\/\*.*\*\//, '').trim())).filter(x => x);
    const key = listOfArgs[index];
    const dependencyId = cacheId(id, injectId(key));

    const metadata = new Metadata(METADATA_KEY.INJECT_TAG, dependencyId);
    tagParameter(target, targetKey, index, metadata);
  };
}

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
