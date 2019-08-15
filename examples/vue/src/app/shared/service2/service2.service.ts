import { IService2 } from './iservice2.service';
import { Inject, injectable, cid, inject } from '../../../../../../src';
import { IService3 } from '../service3';
import { IService4 } from '../service4';

@injectable()
export class Service2 implements IService2 {
  @Inject(cid.IService3) service3_name: IService3;

  constructor(@inject() private service4: IService4) {}

  method2(): string {
    console.log(this.service3_name, this.service4);
    return 'method 2 ' + this.service3_name.method3();
  }
}
