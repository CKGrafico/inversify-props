# Inversify Props

Dependency injection for **TypeScript**, without the boilerplate. `inversify-props` wraps [InversifyJS](https://inversify.io/) so you can register a class once and inject it as a property (or constructor parameter) with a single `@inject()` — no manual ids, no fluent binding ceremony. Framework-agnostic: works with **Vue, LitElement, vanilla TS**, or anything else. Built on **inversify 8**.

Using React? Try the companion package [inversify-hooks](https://github.com/CKGrafico/inversify-hooks), a thin `useInject` layer on top of this one.

[![npm version](https://img.shields.io/npm/v/inversify-props.svg)](https://www.npmjs.com/package/inversify-props)
[![npm downloads](https://img.shields.io/npm/dm/inversify-props.svg)](https://www.npmjs.com/package/inversify-props)
[![GitHub license](https://img.shields.io/github/license/CKGrafico/inversify-props.svg)](https://github.com/CKGrafico/inversify-props/blob/main/LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/CKGrafico/inversify-props/main.svg)
[![GitHub issues](https://img.shields.io/github/issues/CKGrafico/inversify-props.svg)](https://github.com/CKGrafico/inversify-props/issues)

![logo](https://i.imgur.com/syVbzU6.gif)

---

## Table of contents

- [Why](#why)
- [Installation](#installation)
- [TypeScript configuration](#typescript-configuration)
- [Quick start](#quick-start)
- [Registering dependencies](#registering-dependencies)
- [Injecting dependencies](#injecting-dependencies)
- [Custom ids](#custom-ids)
- [Your own container](#your-own-container)
- [Testing with mocks](#testing-with-mocks)
- [API reference](#api-reference)
- [Use it as an agent skill](#use-it-as-an-agent-skill)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)

## Why

Plain InversifyJS asks you to manage service identifiers and write fluent bindings for every dependency. `inversify-props` does that for you: it derives ids from class names automatically and lets you inject by property. You probably **don't** need it if you want the full power of inversify (custom scopes everywhere, factories, multi-injection) — it's intentionally a thin convenience layer for the common "inject my services" case.

## Installation

```bash
npm install inversify-props
```

Built on **inversify 8**, which is pulled in for you — no separate `reflect-metadata` install needed. Type definitions and both ESM and CommonJS builds ship with the package.

> **Note:** inversify 8 is ESM-first. Bundlers (Vite, webpack, etc.) need nothing special; consuming it via `require()` from plain CommonJS Node needs Node 20.19+ or 22+.

## TypeScript configuration

inversify-props uses legacy decorators, so enable `experimentalDecorators` and keep `useDefineForClassFields` off:

```jsonc
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["es2020", "dom"],
    "moduleResolution": "bundler",
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  }
}
```

> ⚠️ If `useDefineForClassFields` is `true`, an injected property's class field shadows the injected getter and reads back `undefined`. It defaults to `false` when `target` is below `ES2022`.

## Quick start

```ts
import { cid, container, inject } from 'inversify-props';

// 1. Define a class + interface
interface IService1 {
  method1(): string;
}
class Service1 implements IService1 {
  method1() {
    return 'method 1';
  }
}

// 2. Register it (usually in app.container.ts), before anything resolves
container.addSingleton<IService1>(Service1);

// 3. Inject it anywhere
class MyComponent {
  @inject() service1!: IService1;
}

// ...or resolve it directly
const service1 = container.get<IService1>(cid.IService1);
```

> :warning: If you use a minifier/obfuscator, configure it to preserve class and function names — see [Troubleshooting](#troubleshooting).

## Registering dependencies

Register on the shared `container` before resolving. Three lifetimes are available:

```ts
container.addSingleton<IService1>(Service1); // one shared instance (most common)
container.addTransient<ILogger>(Logger);     // a new instance on every resolve
container.addRequest<IUnitOfWork>(UnitOfWork); // one instance per request scope
```

The generic (`<IService1>`) is just the compile-time type. The **runtime id is derived from the class name** and cached under both `Service1` and `IService1`, which is why `cid.IService1` works.

## Injecting dependencies

Inject as a property — the id is inferred from the **property name** (camelCase, PascalCase and leading `_` are all handled):

```ts
export class MyOtherService {
  @inject() private service1: IService1;
  @inject() private _service1: IService1;
  @inject() private Service1: IService1;
}
```

Constructor injection infers the id from the **parameter name**:

```ts
export class MyOtherService {
  constructor(@inject() private exampleService: IExampleService) {}
}
```

## Custom ids

Don't want auto-generated ids? Pass your own:

```ts
container.addSingleton<IService1>(Service1, 'MyService1');

export class MyComponent {
  @inject('MyService1') service1!: IService1;
}
```

## Your own container

The library ships a ready-to-use `container`, but you can create and install your own:

```ts
import { Container, setContainer } from 'inversify-props';

setContainer(new Container());
```

## Testing with mocks

The recommended pattern, before each test: reset the container, re-register dependencies, then mock what the test needs.

```ts
import { cid, mockSingleton, resetContainer } from 'inversify-props';

beforeEach(() => {
  resetContainer();
  containerBuilder(); // your registrations
  mockSingleton<IHttpService>(cid.IHttpService, HttpServiceMock);
});
```

`mockTransient` and `mockRequest` have the same signature. `resetContainer()` unbinds everything.

## API reference

| Export | Description |
| --- | --- |
| `container` | The shared container instance (auto-created). |
| `container.addSingleton<T>(Class, id?)` | Register a single shared instance. |
| `container.addTransient<T>(Class, id?)` | Register a new instance per resolve. |
| `container.addRequest<T>(Class, id?)` | Register one instance per request scope. |
| `container.get<T>(id)` | Resolve a dependency by id. |
| `cid` | Cache of generated ids, e.g. `cid.IService1`. |
| `inject` / `Inject` | Property/parameter decorator for injecting dependencies. |
| `injectable` | Class decorator marking a class as injectable. |
| `mockSingleton` / `mockTransient` / `mockRequest` | Replace a registered id with another implementation (testing). |
| `resetContainer()` | Unbind everything from the container. |
| `getContainer()` / `setContainer(opts)` | Access or replace the underlying InversifyJS container. |
| `Container` | The container class, if you want your own instance. |

## Use it as an agent skill

This repo ships an [Agent Skill](skills/inversify-props/SKILL.md) so AI coding agents (Claude Code, Cursor, etc.) know how to wire up DI with this library. Install it with [`npx skills`](https://skills.sh):

```bash
npx skills add CKGrafico/inversify-props
```

## Troubleshooting

| Symptom | Cause & fix |
| --- | --- |
| Injected property is `undefined` | `useDefineForClassFields` is `true`. Set it to `false` (or keep `target` below `ES2022`). |
| Works in dev, breaks in production | The minifier mangled class names, so `cid.IXxx` is `undefined`. Enable `keepNames` (esbuild/Vite) or `keep_classnames` + `keep_fnames` (Terser/Uglify). Vue CLI uses Terser under the hood — set it via `configureWebpack` → `optimization.minimizer`. |
| `No matching bindings found` | The service wasn't registered, or registration ran after it was resolved. Register first. |
| Decorators throw at runtime | `experimentalDecorators` is off in your `tsconfig.json`. |

## Credits

Built on [InversifyJS](https://inversify.io/). Licensed under [MIT](LICENSE).
