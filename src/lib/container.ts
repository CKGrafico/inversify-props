import { Container as InversifyContainer, interfaces } from 'inversify';
import { cacheId, injectId } from './helpers';

export class Container extends InversifyContainer {
  public bindTo<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string | symbol): interfaces.BindingInWhenOnSyntax<T> {

    const dependencyId = cacheId(id, injectId(constructor));
    return super.bind<T>(dependencyId).to(constructor);
  }

  public addTransient<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string | symbol): interfaces.BindingWhenOnSyntax<T> {

    const dependencyId = cacheId(id, injectId(constructor));
    return super.bind<T>(dependencyId).to(constructor).inTransientScope();
  }

  public addSingleton<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string | symbol): interfaces.BindingWhenOnSyntax<T> {

    const dependencyId = cacheId(id, injectId(constructor));
    return super.bind<T>(dependencyId).to(constructor).inSingletonScope();
  }

  public addRequest<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string | symbol): interfaces.BindingWhenOnSyntax<T> {

    const dependencyId = cacheId(id, injectId(constructor));
    return super.bind<T>(dependencyId).to(constructor).inRequestScope();
  }

  public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    return super.get<T>(serviceIdentifier);
  }
}
