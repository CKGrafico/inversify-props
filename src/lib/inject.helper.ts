import { inject as __inject, injectable as __injectable } from 'inversify';
import { idsCache } from './id.helper';
import { Constructor, Id } from './inversify.types';
import { log } from './log.helper';
import { cleanParameter, getParametersFromConstructor } from './parameters.helper';

export function injectable(customId?: Id) {
  return function(constructor: Constructor) {
    // generateIdAndAddToCache(constructor, customId);

    return __injectable()(constructor);
  };
}

export function inject(customId?: Id, debug = false) {
  return (target: any, methodName: string, index?: number) => {
    log(debug, 'DI: Registering', target, index);

    if (isParameterDecorator(index)) {
      return injectParameterDecorator(target, methodName, index, debug);
    }

    return injectPropertyDecorator(target, methodName, debug);
  };
}

export const Inject = inject;

export function isParameterDecorator(index: number): boolean {
  return index !== undefined ? typeof index === 'number' : false;
}

function injectParameterDecorator(target: Constructor, methodName: string, index: number, debug = false): void {
  log(debug, 'DI: is parameter decorator', target, index);

  const parameters = getParametersFromConstructor(target);
  const currentParameter = parameters[index];
  const cacheIdNameFromParameter = cleanParameter(currentParameter);
  const cachedId = idsCache[cacheIdNameFromParameter];
  console.log(idsCache, cachedId, target, methodName, index);

  return __inject(cachedId)(target, methodName, index);
}

function injectPropertyDecorator(target: any, methodName: string, debug = false) {
  // log(debug, 'DI: is method/property decorator', cachedId, target);
  // Reflect.deleteProperty(target, methodName);
  // Reflect.defineProperty(target, methodName, {
  //   get() {
  //     return getContainer().get(cachedId);
  //   },
  //   set(value) {
  //     return value;
  //   }
  // });
  // return __inject(cachedId)(target, methodName);
}
