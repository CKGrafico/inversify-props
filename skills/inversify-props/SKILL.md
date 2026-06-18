---
name: inversify-props
description: Set up and use dependency injection in TypeScript with inversify-props (a wrapper over InversifyJS 8). Use when wiring up a DI container in a Vue, LitElement, vanilla TS or framework-agnostic app, registering singletons/transients/request-scoped services, injecting dependencies with property or constructor @inject, auto-generating ids from class names, or mocking injected services in tests. For React, prefer the companion inversify-hooks skill.
---

# inversify-props

`inversify-props` is a small wrapper around [InversifyJS](https://inversify.io/) 8 that removes the boilerplate of binding ids and lets you inject dependencies as class properties (or constructor params) with `@inject()`. It is framework-agnostic — use it in Vue, LitElement, vanilla TypeScript, or anywhere you want simple DI. For React, the companion package `inversify-hooks` adds a `useInject` hook on top of this one.

## When to use this skill

- Setting up a DI container in a TypeScript app and injecting services into classes/components.
- Reaching for `container.addSingleton`, `@inject`, or `cid` and being unsure of the exact API or required TypeScript config.
- Injecting a service into another service via property or constructor injection.
- Writing tests that need to swap a real service for a mock.
- Debugging "no matching bindings", `undefined` injected properties, or production builds where injection works in dev but breaks after minification.

## Setup (do this once)

1. Install (inversify comes bundled; no separate `reflect-metadata` needed):
   ```bash
   npm install inversify-props
   ```

2. The `tsconfig.json` **must** enable legacy decorator support, or injection silently fails:
   ```jsonc
   {
     "compilerOptions": {
       "experimentalDecorators": true,
       "useDefineForClassFields": false // critical: see "Gotchas"
     }
   }
   ```

## Registering dependencies

Register services on the shared `container` once, before they are resolved:

```ts
import { container } from 'inversify-props';
import { IUserService, UserService } from './services';

export function buildContainer(): void {
  container.addSingleton<IUserService>(UserService);   // one shared instance
  // container.addTransient<T>(Cls);  // new instance per resolve
  // container.addRequest<T>(Cls);    // one instance per request scope
  // container.addSingleton<T>(Cls, 'CustomId'); // explicit id
}
```

The generic argument (`<IUserService>`) is only the TypeScript type. The **runtime id is derived from the class name** (`UserService`), and inversify-props registers it under both `UserService` and `IUserService` keys in the `cid` cache. So `cid.IUserService` resolves the `UserService` registration.

## Injecting dependencies

Use `@inject()` for property injection — the id is inferred from the **property name**, so name the property after the service class:

```ts
import { inject } from 'inversify-props';

export class OrderService {
  @inject() private userService!: IUserService; // resolves id "UserService"
}
```

Constructor injection works the same way (id inferred from the parameter name), and you can always pass an explicit id:

```ts
export class OrderService {
  constructor(@inject() private userService: IUserService) {}      // by param name
}

export class OrderService {
  @inject('CustomId') private userService!: IUserService;          // explicit id
}
```

Resolve anywhere via the container:

```ts
import { cid, container } from 'inversify-props';
const userService = container.get<IUserService>(cid.IUserService);
```

## Testing with mocks

Swap a registered implementation for a fake, then reset between tests:

```ts
import { cid, mockSingleton, resetContainer } from 'inversify-props';

afterEach(() => resetContainer());

it('uses the user service', () => {
  mockSingleton<IUserService>(cid.IUserService, FakeUserService);
  // ...exercise and assert
});
```

`mockTransient` and `mockRequest` exist with the same signature. `resetContainer()` unbinds everything.

## Full export surface

`container`, `cid`, `inject` / `Inject`, `injectable`, `getContainer`, `setContainer`, `resetContainer`, `Container`, `mockSingleton`, `mockTransient`, `mockRequest`, plus id helpers (`generateIdName`, `getOrSetIdFromCache`, …) and the `Constructor` / `Id` / `IdsCache` types.

## Gotchas

- **`useDefineForClassFields` must be `false`** (it defaults to `false` only when `target` is below `ES2022`). With class-field define semantics on, the instance field shadows the injected getter and the property is `undefined`. Keep `target` at `ES2020` or set the flag explicitly.
- **Minification must keep names.** Ids come from `constructor.name`. If a bundler mangles class names, `cid.IXxx` becomes `undefined` and resolution fails in production only. Enable `keepNames` (esbuild/Vite) or set `keep_classnames`/`keep_fnames` for Terser/Uglify.
- **Use legacy decorators, not TC39.** inversify 8 still requires `experimentalDecorators: true`. Do not enable the standard/stage-3 decorators for these classes.
- **Register before resolving.** Build the container before the first `container.get`/injection, otherwise the id is unbound.
- The package ships **both ESM and CommonJS** builds. Bundlers need no special config; consuming via `require()` from plain Node needs Node 20.19+ or 22+ (an inversify 8 requirement).
