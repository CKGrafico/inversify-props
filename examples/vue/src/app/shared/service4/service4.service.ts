import { IService4 } from './iservice4.service';
import { injectable } from '../../../../../../src';

@injectable()
export class Service4 implements IService4 {
  method4(): string {
    return 'method 4';
  }
}
