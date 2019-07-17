import { container } from '../../../../src';
import { IExampleService, ExampleService } from './services';
import './components/example-element';
import { ISubexampleService } from './services/isubexample-service';
import { SubexampleService } from './services/subexample-service';

container.addSingleton<IExampleService>(ExampleService);
container.addSingleton<ISubexampleService>(SubexampleService);
