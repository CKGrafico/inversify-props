import { inject } from 'inversify-props';
import type { INameService } from './name.service';

export interface IGreeterService {
  greet(): string;
}

export class GreeterService implements IGreeterService {
  // id inferred from the property name -> "NameService"
  @inject() private nameService!: INameService;

  greet(): string {
    return `Hello from ${this.nameService.name()}`;
  }
}
