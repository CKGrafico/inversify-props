import { IExampleService } from './iexample-service';

export class ExampleService implements IExampleService {
  public transform(value: string): string {
    return value.replace('|', '|-');
  }
}
