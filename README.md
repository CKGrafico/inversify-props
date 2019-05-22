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
```
npm install --save inversify-props
```

## Usage
```
container.addSingleton<IService1>(Service1);
container.addSingleton<IService2>(Service2);

export default class extends Component {
  @Inject() service1: IService1;
  @Inject() service2: IService2;
}
```

## Alternative usage (without magic)
```
container.addSingleton<IService1>(Service1, 'Service1');
container.addSingleton<IService2>(Service2, 'Service2');

export default class extends Component {
  @Inject('Service1') service1: IService1;
  @Inject('Service2') service2: IService2;
}
```

## Why we made this package
The idea is to add a simple wrapper that helps us to inject dependencies in components using `property decorators`, we have also extend a little `inversify` adding some methods that make our experience injecting dependencies easier.

**You probably don't need this if:**
- You have experience using inversify and you don't need to simplify the process.
- You want to use all the power of inversify, we are only injecting dependencies like services, helpers, utils...
- You don't want to inject your dependencies as properties.

## How register a dependency
Inversify needs an id to register our dependencies, this wrapper is going to do this for you 'magically' but if you want to uglify the code, keep reading the docs 🤓.

First of all create a class and an interface with the public methods of your class.
```
// iservice1.ts
export interface IService1 {
    method1(): string;
}

// service.ts
@injectable()
export class Service1 implements IService1 {
  method1(): string {
    return 'method 1';
  }
}
```
> Note: Don't forget to decorate the class as `@injectable()` this will made your class candidate to be injectable inside other.

Now is time to register the service in the container, we usually do that in `app.container.ts` or `app.ts`.
```
 container.addSingleton<IService1>(Service1);
```

## Other ways to register a class
As [inversify accepts](https://github.com/inversify/InversifyJS/blob/master/wiki/scope.md), we have configured three types of registration.
- Singleton: The dependency will be created only once, one dependency - one object.
- Transient: The dependency will be created each time is injected, one dependency - one object per injection.
- Request: Special case of singleton, more info in [official docs](https://github.com/inversify/InversifyJS/blob/master/wiki/scope.md#about-inrequestscope).

## How to use in your components
Once your dependencies are registered in the container, is simple as create a property with the name and the interface.
```
export default class extends Component {
  @Inject() service1: IService1;
}
```

> Note: Part of the magic is that the name of the property has to be the name of the interface, this is how we don't need to add the `id`.

## Some examples
- [Basic example with Vue](https://github.com/CKGrafico/inversify-props/tree/master/examples/vue)
- [Basic example with LitElement](https://github.com/CKGrafico/inversify-props/tree/master/examples/lit-element)
- [Used in my Boilerplates](https://boilerplates.js.org)

## How to configure uglify
If you want to use uglify to ofuscate the code, you will need to add this options to preserve the names of the clases (we need them to generate the ids `magically` 😉).

```
new UglifyJSPlugin({
  uglifyOptions: {
    keep_classnames: true,
    keep_fnames: true,
  }
});
```

## Next steps
- Investigate if can we remove `@injectable`

