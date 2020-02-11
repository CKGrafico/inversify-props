import { addIdToCache, generateIdOfDependency } from './id.helper';
import { Constructor, Id } from './inversify.types';
import { log } from './log.helper';

export function inject(id?: Id, debug = false) {
  return (constructor: Constructor, methodName: string, index?: number) => {
    const dependencyId = generateIdOfDependency(constructor, id);
    const cachedId = addIdToCache(dependencyId);

    log(debug, 'DI: Registering', constructor, index, cachedId);

    if (isParameterDecorator(index)) {
      log(debug, 'DI: is parameter decorator');
      return injectParameterDecorator(constructor, index, cachedId, debug);
    }

    log(debug, 'DI: is property decorator');
    // return injectPropertyDecorator(constructor, methodName, cachedId, debug);
  };
}

export const Inject = inject;

export function isParameterDecorator(index: number): boolean {
  return index !== undefined ? typeof index === 'number' : false;
}

function injectParameterDecorator(constructor: Constructor, index: number, id?: Id, debug = false) {
  console.log(id, constructor.name, index);
}
