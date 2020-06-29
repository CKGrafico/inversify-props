import { inject as __inject, injectable as __injectable } from 'inversify';
import { getContainer } from './container';
import { generateIdName, getOrSetIdFromCache, idsCache } from './id.helper';
import { Constructor, Id } from './inversify.types';
import { log } from './log.helper';
import { cleanParameter, getParametersFromConstructor } from './parameters.helper';

export function injectable() {
  return function (constructor: Constructor) {
    return __injectable()(constructor);
  };
}

export function inject(customId?: Id, debug = false) {
  return (target: any, methodName: string, indexOrDescriptor?: number | PropertyDescriptor) => {
    log(debug, 'DI: Registering', target, indexOrDescriptor, customId);
    log(debug, 'DI: idsCache', idsCache);

    if (typeof indexOrDescriptor === 'number' && isParameterDecorator(indexOrDescriptor)) {
      return injectParameterDecorator(target, methodName, indexOrDescriptor, customId, debug);
    }

    return injectPropertyDecorator(target, methodName, indexOrDescriptor as PropertyDescriptor, customId, debug);
  };
}

export const Inject = inject;

export function isParameterDecorator(index: number): boolean {
  return index !== undefined ? typeof index === 'number' : false;
}

function injectParameterDecorator(
  target: Constructor,
  methodName: string,
  index: number,
  customId: Id,
  debug = false
): void {
  log(debug, 'DI: is parameter decorator', target, index, customId);

  let id = customId;

  if (!id) {
    const parameters = getParametersFromConstructor(target);
    log(debug, parameters);
    const currentParameter = parameters[index];
    log(debug, currentParameter);
    const cacheIdNameFromParameter = cleanParameter(currentParameter);
    log(debug, cacheIdNameFromParameter);
    id = getOrSetIdFromCache(generateIdName(cacheIdNameFromParameter));
    log(debug, id);
  }

  return __inject(id)(target, methodName, index);
}

function injectPropertyDecorator(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor,
  customId: Id,
  debug = false
) {
  log(debug, 'DI: is method/property decorator', methodName, target, customId);

  let id = customId;

  if (!id) {
    const cacheIdNameFromParameter = cleanParameter(methodName);
    id = getOrSetIdFromCache(generateIdName(cacheIdNameFromParameter));
  }

  if (descriptor) {
    log(debug, 'has descriptor', descriptor);
    descriptor.get = () => getContainer().get(id);
  } else {
    log(debug, 'Using Reflect defineProperty will be deprecated soon, use ES6');
    Reflect.deleteProperty(target, methodName);
    Reflect.defineProperty(target, methodName, {
      get() {
        return getContainer().get(id);
      },
      set(value) {
        return value;
      }
    });
  }

  return __inject(id)(target, methodName);
}
