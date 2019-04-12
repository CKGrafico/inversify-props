import { Container as InversifyContainer, interfaces } from 'inversify';
import { injectId } from './helpers';

export class Container extends InversifyContainer {
  public bindTo<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string): interfaces.BindingInWhenOnSyntax<T> {

    return super.bind<T>(id || injectId(constructor)).to(constructor);
  }

  public addTransient<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string): interfaces.BindingWhenOnSyntax<T> {

    return super.bind<T>(id || injectId(constructor)).to(constructor).inTransientScope();
  }

  public addSingleton<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string): interfaces.BindingWhenOnSyntax<T> {

    return super.bind<T>(id || injectId(constructor)).to(constructor).inSingletonScope();
  }

  public addRequest<T>(constructor: {
    new (...args: any[]): T;
  }, id?: string): interfaces.BindingWhenOnSyntax<T> {

    return super.bind<T>(id || injectId(constructor)).to(constructor).inRequestScope();
  }
}
