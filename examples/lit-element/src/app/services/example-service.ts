import { IExampleService } from './iexample-service';
import { injectable } from '../../../../../src';

@injectable()
export class ExampleService implements IExampleService {
  public transform(value: string): string {
    return value.replace('|', '|-');
  }
}
