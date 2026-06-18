import { container } from 'inversify-props';
import { GreeterService, IGreeterService, INameService, NameService } from './index';

export function buildContainer(): void {
  container.addSingleton<INameService>(NameService);
  container.addSingleton<IGreeterService>(GreeterService);
}
