import { CachedId, Constructor, Id, IdsCache } from './inversify.types';

export const idsCache: IdsCache = {};

export function generateIdOfDependency<T>(constructor: Constructor<T>, id: Id): Id {
  return id || Symbol(constructor.name);
}

export function generateIdNameOfDependency<T>(constructor: Constructor<T>, id: Id): string {
  return id.toString() || constructor.name;
}

export function addIdToCache(id: Id, name: string): CachedId {
  const existingId = idsCache[id.toString()];

  if (existingId) {
    return existingId;
  }

  return (idsCache[id.toString()] = {
    id,
    name
  });
}

export function generateIdAndAddToCache<T>(constructor: Constructor<T>, id?: Id): CachedId {
  const dependencyId = generateIdOfDependency(constructor, id);
  const dependencyIdName = generateIdNameOfDependency(constructor, id);
  const cachedId = addIdToCache(dependencyId, dependencyIdName);

  return cachedId;
}
