import { inject } from '../../../../../../src';
import { IService3 } from '../service3';
import { IService4 } from '../service4';
import { IService2 } from './iservice2.service';

export class Service2 implements IService2 {
  @inject() _service3: IService3;

  constructor(@inject() private service4: IService4) {}

  method2(): string {
    console.log(this._service3, this.service4);
    return 'method 2 ' + this._service3.method3();
  }
}
