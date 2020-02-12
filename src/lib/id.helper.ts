import { Constructor, Id, IdsCache } from './inversify.types';

export let idsCache: IdsCache = {};

export function resetIdsCache() {
  idsCache = {};
}

export function generateIdOfDependency<T>(constructor: Constructor<T>, id?: Id): Id {
  return id || Symbol(constructor.name);
}

export function generateIdName(constructorName: string) {
  const name = constructorName;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function generateIdNameOfDependency<T>(constructor: Constructor<T>, id?: Id): string {
  return id ? id.toString() : generateIdName(constructor.name);
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

export function getIdFromCache(name: string): Id {
  const foundId = idsCache[name];

  if (!foundId) {
    throw new Error(`Cannot find ${name} in saved ids from container`);
  }

  return foundId;
}
