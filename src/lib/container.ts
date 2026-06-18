import { Container as InversifyContainer, ContainerOptions, decorate } from 'inversify';
import { generateIdAndAddToCache } from './id.helper';
import { injectable } from './inject.helper';
import { Constructor, Id } from './inversify.types';

const decorated = new WeakSet<object>();

/**
 * Applies `@injectable()` to a class at most once. Decorating a class that is
 * already injectable throws, so failures are swallowed defensively.
 */
function decorateCatchable(constructor: Constructor): void {
  if (decorated.has(constructor)) {
    return;
  }

  try {
    decorate(injectable() as ClassDecorator, constructor);
  } catch {
    // Already injectable — nothing to do.
  }

  decorated.add(constructor);
}

/**
 * This class is the wrapper of inversify Container to add more functionalities.
 * The library exports an instance of the class but you can create your own instance
 */
export class Container extends InversifyContainer {
  public bindTo<T>(constructor: Constructor<T>, customId?: Id) {
    const id = generateIdAndAddToCache(constructor, customId);
    decorateCatchable(constructor);

    return super.bind<T>(id).to(constructor);
  }

  public addTransient<T>(constructor: Constructor<T>, customId?: Id) {
    const id = generateIdAndAddToCache(constructor, customId);
    decorateCatchable(constructor);

    return super.bind<T>(id).to(constructor).inTransientScope();
  }

  public addSingleton<T>(constructor: Constructor<T>, customId?: Id) {
    const id = generateIdAndAddToCache(constructor, customId);
    decorateCatchable(constructor);

    return super.bind<T>(id).to(constructor).inSingletonScope();
  }

  public addRequest<T>(constructor: Constructor<T>, customId?: Id) {
    const id = generateIdAndAddToCache(constructor, customId);
    decorateCatchable(constructor);

    return super.bind<T>(id).to(constructor).inRequestScope();
  }
}

let container: Container | undefined;

export function getContainer(): Container {
  // Lazily create the default container so resolution works even if a bundler
  // tree-shakes away the eager initialization in index.ts.
  return (container ??= new Container());
}

export function setContainer(options?: ContainerOptions): Container {
  return (container = new Container(options));
}

export function resetContainer(): void {
  getContainer().unbindAll();
}
