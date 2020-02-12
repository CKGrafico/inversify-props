import { inject as __inject, injectable as __injectable } from 'inversify';
import { getContainer } from './container';
import { generateIdName, getIdFromCache } from './id.helper';
import { Constructor, Id } from './inversify.types';
import { log } from './log.helper';
import { cleanParameter, getParametersFromConstructor } from './parameters.helper';

export function injectable(customId?: Id) {
  return function(constructor: Constructor) {
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
  log(debug, parameters);
  const currentParameter = parameters[index];
  log(debug, currentParameter);
  const cacheIdNameFromParameter = cleanParameter(currentParameter);
  log(debug, cacheIdNameFromParameter);
  const cachedId = getIdFromCache(generateIdName(cacheIdNameFromParameter));
  log(debug, cachedId);

  return __inject(cachedId)(target, methodName, index);
}

function injectPropertyDecorator(target: any, methodName: string, debug = false) {
  log(debug, 'DI: is method/property decorator', methodName, target);

  const cacheIdNameFromParameter = cleanParameter(methodName);
  const cachedId = getIdFromCache(generateIdName(cacheIdNameFromParameter));

  Reflect.deleteProperty(target, methodName);
  Reflect.defineProperty(target, methodName, {
    get() {
      return getContainer().get(cachedId);
    },
    set(value) {
      return value;
    }
  });
  return __inject(cachedId)(target, methodName);
}
