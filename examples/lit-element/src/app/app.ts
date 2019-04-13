import { container } from '../../../../src';
import { IExampleService, ExampleService } from './services';
import './components/example-element';

container.addSingleton<IExampleService>(ExampleService);
