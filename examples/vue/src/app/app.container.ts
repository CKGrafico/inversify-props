import { container } from '../../../../src';
import { IService1, Service1, IService2, Service2, IService3, Service3 } from '~/shared';

export function containerBuilder(): void {
  container.addSingleton<IService1>(Service1);
  container.addSingleton<IService2>(Service2);
  container.addSingleton<IService3>(Service3);
}
