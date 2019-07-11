import { Container as InversifyContainer, interfaces } from 'inversify';
import { injectId } from './helpers';

export let DependencyId: { [key: string]: string | symbol; } = {};

function cacheId(customId: string, id: string): string | symbol {
  if (customId) {
    DependencyId[customId] = customId;
    return customId;
  }

  const dependencyId = Symbol(id);
  DependencyId[id] = dependencyId;
  return dependencyId;
}

export class Container extends InversifyContainer {
  public bindTo<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string): interfaces.BindingInWhenOnSyntax<T> {

    const dependencyId = cacheId(id, injectId(constructor));
    return super.bind<T>(dependencyId).to(constructor);
  }

  public addTransient<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string): interfaces.BindingWhenOnSyntax<T> {

    const dependencyId = cacheId(id, injectId(constructor));
    return super.bind<T>(dependencyId).to(constructor).inTransientScope();
  }

  public addSingleton<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string): interfaces.BindingWhenOnSyntax<T> {

    const dependencyId = cacheId(id, injectId(constructor));
    return super.bind<T>(dependencyId).to(constructor).inSingletonScope();
  }

  public addRequest<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string): interfaces.BindingWhenOnSyntax<T> {

    const dependencyId = cacheId(id, injectId(constructor));
    return super.bind<T>(dependencyId).to(constructor).inRequestScope();
  }
}
