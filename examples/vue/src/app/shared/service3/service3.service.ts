import { IService3 } from './iservice3.service';
import { injectable } from '../../../../../../src';

@injectable()
export class Service3 implements IService3 {
  method3(): string {
    return 'method 3';
  }
}
