import { container, cid } from '../../../../../src';
import { IExampleService } from '~/services';

export function myHelper(text: string) {
  const exampleService = container.get<IExampleService>(cid.IExampleService);

  console.log('helper', exampleService.transform(text));
}
