
import { ISubexampleService } from './isubexample-service';
import { IExampleService } from './iexample-service';
import { inject, injectable } from '../../../../../src';

@injectable()
export class SubexampleService implements ISubexampleService {
  constructor(@inject() public exampleService: IExampleService) {}

  transform(value: string): string {
    return this.exampleService.transform(value.toUpperCase());
  }

}
