import { Constructor, Id } from './inverisify.types';

export function generateIdOfDependency<T>(constructor: Constructor<T>, id: Id): Id {
  if (id) {
    return id;
  }

  return '___';
}
