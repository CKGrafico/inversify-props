import { afterEach, describe, expect, it } from 'vitest';
import { cid, container, getContainer, inject, mockSingleton, mockTransient, resetContainer, setContainer } from './index';

interface IGreeter {
  greet(): string;
}

class Greeter implements IGreeter {
  greet(): string {
    return 'hello';
  }
}

class LoudGreeter implements IGreeter {
  greet(): string {
    return 'HELLO';
  }
}

interface IGreetingService {
  message(): string;
}

class GreetingService implements IGreetingService {
  // Property injection, id inferred from the property name -> "Greeter".
  @inject() private greeter!: IGreeter;

  message(): string {
    return `${this.greeter.greet()} world`;
  }
}

class AliasedService implements IGreetingService {
  // Property injection with an explicit id.
  @inject(cid.IGreeter) private greeter!: IGreeter;

  message(): string {
    return `${this.greeter.greet()}!`;
  }
}

interface IBanner {
  text(): string;
}

class Banner implements IBanner {
  // Constructor injection, id inferred from the parameter name -> "Greeter".
  constructor(@inject() private greeter: IGreeter) {}

  text(): string {
    return `[${this.greeter.greet()}]`;
  }
}

class Box {}

describe('inversify-props', () => {
  afterEach(() => {
    resetContainer();
  });

  describe('ids (cid)', () => {
    it('registers a class under both its name and its I-prefixed alias', () => {
      container.addSingleton<IGreeter>(Greeter);

      expect(cid.Greeter).toBeDefined();
      expect(cid.IGreeter).toBe(cid.Greeter);
    });
  });

  describe('scopes', () => {
    it('returns the same instance for a singleton', () => {
      container.addSingleton(Box);
      expect(getContainer().get(cid.Box)).toBe(getContainer().get(cid.Box));
    });

    it('returns a new instance per resolve for a transient', () => {
      container.addTransient(Box);
      expect(getContainer().get(cid.Box)).not.toBe(getContainer().get(cid.Box));
    });

    it('resolves a request-scoped dependency', () => {
      container.addRequest(Box);
      expect(getContainer().get(cid.Box)).toBeInstanceOf(Box);
    });
  });

  describe('@inject', () => {
    it('injects into a service via the property name', () => {
      container.addSingleton<IGreeter>(Greeter);
      container.addSingleton<IGreetingService>(GreetingService);

      expect(getContainer().get<IGreetingService>(cid.IGreetingService).message()).toBe('hello world');
    });

    it('injects into a service via an explicit id', () => {
      container.addSingleton<IGreeter>(Greeter);
      container.addSingleton<IGreetingService>(AliasedService);

      expect(getContainer().get<IGreetingService>(cid.IAliasedService).message()).toBe('hello!');
    });

    it('injects via a constructor parameter name', () => {
      container.addSingleton<IGreeter>(Greeter);
      container.addSingleton<IBanner>(Banner);

      expect(getContainer().get<IBanner>(cid.IBanner).text()).toBe('[hello]');
    });

    it('resolves by a custom id', () => {
      container.addSingleton<IGreeter>(Greeter, 'MyGreeter');
      expect(getContainer().get<IGreeter>('MyGreeter').greet()).toBe('hello');
    });
  });

  describe('mocks', () => {
    it('swaps an implementation with mockSingleton', () => {
      container.addSingleton<IGreeter>(Greeter);
      mockSingleton<IGreeter>(cid.IGreeter, LoudGreeter);

      expect(getContainer().get<IGreeter>(cid.IGreeter).greet()).toBe('HELLO');
    });

    it('swaps an implementation with mockTransient', () => {
      container.addSingleton<IGreeter>(Greeter);
      mockTransient<IGreeter>(cid.IGreeter, LoudGreeter);

      expect(getContainer().get<IGreeter>(cid.IGreeter).greet()).toBe('HELLO');
      expect(getContainer().get(cid.IGreeter)).not.toBe(getContainer().get(cid.IGreeter));
    });
  });

  describe('container lifecycle', () => {
    it('unbinds everything on resetContainer', () => {
      container.addSingleton<IGreeter>(Greeter);
      expect(getContainer().isBound(cid.IGreeter)).toBe(true);

      resetContainer();
      expect(getContainer().isBound(cid.IGreeter)).toBe(false);
    });

    it('replaces the active container with setContainer', () => {
      container.addSingleton<IGreeter>(Greeter);
      const fresh = setContainer();

      expect(getContainer()).toBe(fresh);
      expect(getContainer().isBound(cid.IGreeter)).toBe(false);
    });
  });
});
