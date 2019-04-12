import { IService2 } from './iservice2.service';
import { Inject, injectable } from '../../../../../../src';
import { IService3 } from '../service3';

@injectable()
export class Service2 implements IService2 {
  @Inject() service3: IService3;

  method2(): string {
    return 'method 2 ' + this.service3.method3();
  }
}
