import { Container as InversifyContainer, interfaces } from 'inversify';
import { cacheId, injectId } from './helpers';
import { generateIdOfDependency } from './id.helper';
import { Constructor, Id } from './inverisify.types';

/**
 * This class is the wrapper of inversify Container to add more functionalities.
 * The library exports an instance of the class but you can create your own instance
 */
export class Container extends InversifyContainer {
  public bindTo<T>(constructor: Constructor<T>, id?: Id): interfaces.BindingInWhenOnSyntax<T> {
    const dependencyId = generateIdOfDependency(constructor, id);
    // Register/cache The id

    return super.bind<T>(dependencyId).to(constructor);
  }

  public addTransient<T>(constructor: Constructor<T>, id?: Id): interfaces.BindingWhenOnSyntax<T> {
    const dependencyId = cacheId(id, injectId(constructor));
    return super
      .bind<T>(dependencyId)
      .to(constructor)
      .inTransientScope();
  }

  public addSingleton<T>(constructor: Constructor<T>, id?: Id): interfaces.BindingWhenOnSyntax<T> {
    const dependencyId = cacheId(id, injectId(constructor));
    return super
      .bind<T>(dependencyId)
      .to(constructor)
      .inSingletonScope();
  }

  public addRequest<T>(constructor: Constructor<T>, id?: Id): interfaces.BindingWhenOnSyntax<T> {
    const dependencyId = cacheId(id, injectId(constructor));
    return super
      .bind<T>(dependencyId)
      .to(constructor)
      .inRequestScope();
  }

  public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    return super.get<T>(serviceIdentifier);
  }
}

let container: Container;

/**
 * Function that will be used only inside the library to get the correct container instance
 */
export function getContainer(): Container {
  return container;
}

/**
 * Function to set the instance of the container, could be used outside the library
 */

export function setContainer(options?: interfaces.ContainerOptions): Container {
  return (container = new Container(options));
}
