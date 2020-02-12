# Inversify Props

This package is a wrapper of [Inversify](https://github.com/inversify) to simplify how inject your dependencies with property decorators in the components, made with TypeScript and compatible with Vue, React and other component libraries.

Do you use Hooks? You can try the experimental package [inversify-hooks](https://github.com/ckgrafico/inversify-hooks)

![GitHub last commit](https://img.shields.io/github/last-commit/CKGrafico/inversify-props/master.svg)
[![GitHub license](https://img.shields.io/github/license/CKGrafico/inversify-props.svg)](https://github.com/CKGrafico/inversify-props/blob/master/LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/CKGrafico/inversify-props.svg)](https://github.com/CKGrafico/inversify-props/network)
![GitHub contributors](https://img.shields.io/github/contributors/CKGrafico/inversify-props.svg)
[![GitHub issues](https://img.shields.io/github/issues/CKGrafico/inversify-props.svg)](https://github.com/CKGrafico/inversify-props/issues)

![logo](https://i.imgur.com/syVbzU6.gif)

## Installation

```bash
$ npm install inversify-props reflect-metadata --save
```

The inversify-props type definitions are included in the inversify-props npm package.

## How to use

```ts
import 'reflect-metadata'; // Import only once
import { container, inject } from 'inversify-props';

container.addSingleton<IService1>(Service1);
container.addSingleton<IService2>(Service2);
container.addSingleton(Service3);

export default class extends Component {
  @inject() service1: IService1;
  @inject() _service2: IService2;
  @inject() Service3: IService3;
}
```

## How to use this library outside of a component

```ts
import 'reflect-metadata'; // Import only once
import { cid, container, inject } from 'inversify-props';

container.addSingleton<IService1>(Service1, 'MyService1');

// You can inject in other services as a Prop
export class MyOtherService {
  @inject() private service1: IService1;
}

// Also in the constructor as a param
export class MyOtherService {
  constructor(@inject() private exampleService: IExampleService) {}
}

// Or in any function as a variable
export function myHelper() {
  const service1 = container.get<IService1>(cid.IService1);
}

// camelCase, PascalCase and _ are allowed
export class MyOtherService {
  @inject() private service1: IService1;
  @inject() private _service1: IService1;
  @inject() private Service1: IService1;
  @inject() private _Service1: IService1;
}
```

## You can also use any ID that you prefer if you don't want to use auto generated ids

```ts
import 'reflect-metadata'; // Import only once
import { container, inject } from 'inversify-props';

container.addSingleton<IService1>(Service1, 'MyService1');

export default class extends Component {
  @inject('MyService1') service1: IService1;
}
```

> :warning: **Important!** inversify-props requires TypeScript >= 2.0 and the `experimentalDecorators`, `emitDecoratorMetadata`, `types` and `lib`
> compilation options in your `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es6"],
    "types": ["reflect-metadata"],
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Why we made this package

The idea is to add a simple wrapper that helps us to inject dependencies in components using `property decorators`, we have also extend a little `inversify` adding some methods that make our experience injecting dependencies easier.

**You probably don't need this if:**

- You have experience using inversify and you don't need to simplify the process.
- You want to use all the power of inversify, we are only injecting dependencies like services, helpers, utils...
- You don't want to inject your dependencies as properties.

## How to register a dependency

Inversify needs an id to register our dependencies, this wrapper is going to do this for you 'magically' but if you want to uglify the code, keep reading the docs 🤓.

First of all create a class and an interface with the public methods of your class.

```ts
// iservice1.ts
export interface IService1 {
  method1(): string;
}

// service.ts
export class Service1 implements IService1 {
  method1(): string {
    return 'method 1';
  }
}
```

Now is time to register the service in the container, we usually do that in `app.container.ts` or `app.ts`.

```ts
container.addSingleton<IService1>(Service1);
```

## How to test

There are some helper functions to test, the recommended way to test is beforeEach test:

1. Reset the Container
2. Register again all the dependencies of the container (this is your job)
3. Mock all the necessary dependencies for the test

```ts
beforeEach(() => {
  resetContainer();
  containerBuilder();
  mockSingleton<IHttpService>(cid.IHttpService, HttpServiceMock);
});
```

## Other ways to register a class

As [inversify accepts](https://github.com/inversify/InversifyJS/blob/master/wiki/scope.md), we have configured three types of registration.

- Singleton: The dependency will be created only once, one dependency - one object.
- Transient: The dependency will be created each time is injected, one dependency - one object per injection.
- Request: Special case of singleton, more info in [official docs](https://github.com/inversify/InversifyJS/blob/master/wiki/scope.md#about-inrequestscope).

## How to use in your components

Once your dependencies are registered in the container, is simple as create a property with the name and the interface.

```ts
export default class extends Component {
  @inject() service1: IService1;
}
```

> Note: Part of the magic is that the name of the property has to be the name of the interface, this is how we don't need to add the `id`.

## Some examples

- [Basic example with Vue](https://github.com/CKGrafico/inversify-props/tree/master/examples/vue)
- [Basic example with LitElement](https://github.com/CKGrafico/inversify-props/tree/master/examples/lit-element)
- [Used in my Boilerplates](https://boilerplates.js.org)

## How to configure Uglify or Terser

If you want to use Uglify or Terser to obfuscate the code, you will need to add this options to preserve the names of the classes (we need them to generate the ids `magically` 😉).

```ts
new UglifyJSPlugin({
  uglifyOptions: {
    keep_classnames: true,
    keep_fnames: true
  }
});
```

```ts
new TerserPlugin({
  terserOptions: {
    keep_classnames: true,
    keep_fnames: true
  }
});
```
