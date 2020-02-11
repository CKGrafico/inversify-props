import { Container as InversifyContainer, interfaces } from 'inversify';
import { generateIdAndAddToCache } from './id.helper';
import { Constructor, Id } from './inversify.types';

/**
 * This class is the wrapper of inversify Container to add more functionalities.
 * The library exports an instance of the class but you can create your own instance
 */
export class Container extends InversifyContainer {
  public bindTo<T>(constructor: Constructor<T>, customId?: Id): interfaces.BindingInWhenOnSyntax<T> {
    const { id } = generateIdAndAddToCache(constructor, customId);

    return super.bind<T>(id).to(constructor);
  }

  public addTransient<T>(constructor: Constructor<T>, customId?: Id): interfaces.BindingWhenOnSyntax<T> {
    const { id } = generateIdAndAddToCache(constructor, customId);

    return super
      .bind<T>(id)
      .to(constructor)
      .inTransientScope();
  }

  public addSingleton<T>(constructor: Constructor<T>, customId?: Id): interfaces.BindingWhenOnSyntax<T> {
    const { id } = generateIdAndAddToCache(constructor, customId);

    return super
      .bind<T>(id)
      .to(constructor)
      .inSingletonScope();
  }

  public addRequest<T>(constructor: Constructor<T>, customId?: Id): interfaces.BindingWhenOnSyntax<T> {
    const { id } = generateIdAndAddToCache(constructor, customId);

    return super
      .bind<T>(id)
      .to(constructor)
      .inRequestScope();
  }

  public get<T>(serviceIdentifier: Id): T {
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
