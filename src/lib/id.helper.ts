import { Constructor, Id, IdsCache } from './inversify.types';

export let idsCache: IdsCache = {};

export function resetIdsCache() {
  idsCache = {};
}

export function generateIdFromName(name: string, id?: Id): Id {
  return id || Symbol(name);
}

export function generateIdOfDependency<T>(constructor: Constructor<T>, id?: Id): Id {
  return generateIdFromName(constructor.name, id);
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

  // Adds also 'I' for compatibility with interfaces
  idsCache[`I${name}`] = id;

  return (idsCache[name] = id);
}

export function generateIdAndAddToCache<T>(constructor: Constructor<T>, id?: Id): Id {
  const dependencyId = generateIdOfDependency(constructor, id);
  const dependencyIdName = generateIdNameOfDependency(constructor, id);
  const cachedId = addIdToCache(dependencyId, dependencyIdName);

  return cachedId;
}

export function getOrSetIdFromCache(dependencyIdName: string, id?: Id): Id {
  const cachedId = idsCache[dependencyIdName];

  if (cachedId) {
    return cachedId;
  }

  const dependencyId = generateIdFromName(dependencyIdName, id);
  const newCachedId = addIdToCache(dependencyId, dependencyIdName);
  return newCachedId;
}
