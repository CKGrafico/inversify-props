import { inject as __inject } from 'inversify';
import { getContainer } from './container';
import { generateIdAndAddToCache } from './id.helper';
import { Id } from './inversify.types';
import { log } from './log.helper';

export function inject(customId?: Id, debug = false) {
  return (target: any, methodName: string, index?: number) => {
    console.log(target);
    const cachedId = generateIdAndAddToCache(target, customId);

    log(debug, 'DI: Registering', target, index, cachedId);

    if (isParameterDecorator(index)) {
      return injectParameterDecorator(target, methodName, index, cachedId, debug);
    }

    return injectPropertyDecorator(target, methodName, cachedId, debug);
  };
}

export const Inject = inject;

export function isParameterDecorator(index: number): boolean {
  return index !== undefined ? typeof index === 'number' : false;
}

function injectParameterDecorator(target: any, methodName: string, index: number, cachedId: Id, debug = false) {
  log(debug, 'DI: is parameter decorator', cachedId, target, index);

  return __inject(cachedId)(target, methodName, index);
}

function injectPropertyDecorator(target: any, methodName: string, cachedId: Id, debug = false) {
  log(debug, 'DI: is method/property decorator', cachedId, target);

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
