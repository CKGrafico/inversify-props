import { inject } from '../../../../../src';
import { IExampleService } from './iexample-service';
import { ISubexampleService } from './isubexample-service';

export class SubexampleService implements ISubexampleService {
  constructor(@inject() public exampleService: IExampleService) {}

  transform(value: string): string {
    return this.exampleService.transform(value.toUpperCase());
  }
}
