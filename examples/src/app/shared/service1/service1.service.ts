import { IService1 } from './iservice1.service';
import { injectable } from '../../../../../src';

@injectable()
export class Service1 implements IService1 {
  method1(): string {
    return 'method 1';
  }
}
