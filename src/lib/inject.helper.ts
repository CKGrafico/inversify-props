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
  return (target: any, methodName: string | symbol | undefined, indexOrDescriptor?: number | PropertyDescriptor) => {
    log(debug, 'DI: Registering', target, indexOrDescriptor, customId);
    log(debug, 'DI: idsCache', idsCache);

    if (typeof indexOrDescriptor === 'number' && isParameterDecorator(indexOrDescriptor)) {
      return injectParameterDecorator(target, methodName, indexOrDescriptor, customId, debug);
    }

    injectPropertyDecorator(
      target,
      methodName as string | symbol,
      indexOrDescriptor as PropertyDescriptor | undefined,
      customId,
      debug
    );
  };
}

export const Inject = inject;

export function isParameterDecorator(index: number): boolean {
  return index !== undefined ? typeof index === 'number' : false;
}

function injectParameterDecorator(
  target: Constructor,
  methodName: string | symbol | undefined,
  index: number,
  customId?: Id,
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

  __inject(id)(target, methodName, index);
}

function injectPropertyDecorator(
  target: any,
  methodName: string | symbol,
  descriptor: PropertyDescriptor | undefined,
  customId?: Id,
  debug = false
): void {
  log(debug, 'DI: is method/property decorator', methodName, target, customId);

  let id = customId;

  if (!id) {
    id = getOrSetIdFromCache(generateIdName(cleanParameter(String(methodName))));
  }

  const resolvedId = id;

  // Resolve lazily from the current container on access. This keeps injection
  // working even after the container is reconfigured (e.g. mocked in tests),
  // and does not require inversify metadata for the property.
  if (descriptor) {
    descriptor.get = () => getContainer().get(resolvedId);
    return;
  }

  Reflect.deleteProperty(target, methodName);
  Reflect.defineProperty(target, methodName, {
    configurable: true,
    enumerable: true,
    get() {
      return getContainer().get(resolvedId);
    },
    set() {
      // Ignore writes — the value always comes from the container.
    }
  });
}
