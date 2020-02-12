import { getContainer } from './container';

export function mockSingleton<T>(
  id: string | symbol,
  to: {
    new (...args: any[]): T;
  }
) {
  getContainer().unbind(id);
  getContainer().addSingleton<T>(to, id);
}

export function mockTransient<T>(
  id: string | symbol,
  to: {
    new (...args: any[]): T;
  }
) {
  getContainer().unbind(id);
  getContainer().addTransient<T>(to, id);
}

export function mockRequest<T>(
  id: string | symbol,
  to: {
    new (...args: any[]): T;
  }
) {
  getContainer().unbind(id);
  getContainer().addRequest<T>(to, id);
}
