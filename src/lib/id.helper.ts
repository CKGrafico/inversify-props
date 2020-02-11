import { Constructor, Id, IdsCache } from './inversify.types';

export const idsCache: IdsCache = {};

export function generateIdOfDependency<T>(constructor: Constructor<T>, id?: Id): Id {
  return id || Symbol(constructor.name);
}

export function generateIdNameFromConstructor<T>(constructor: Constructor<T>) {
  return constructor.name.toUpperCase();
}

export function generateIdNameOfDependency<T>(constructor: Constructor<T>, id?: Id): string {
  return id ? id.toString() : generateIdNameFromConstructor(constructor);
}

export function addIdToCache(id: Id, name: string): Id {
  const existingId = idsCache[name];

  if (existingId) {
    return existingId;
  }

  return (idsCache[name] = id);
}

export function generateIdAndAddToCache<T>(constructor: Constructor<T>, id?: Id): Id {
  const dependencyId = generateIdOfDependency(constructor, id);
  const dependencyIdName = generateIdNameOfDependency(constructor, id);
  const cachedId = addIdToCache(dependencyId, dependencyIdName);

  return cachedId;
}
