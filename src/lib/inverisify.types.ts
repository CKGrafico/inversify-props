export type Constructor<T> = {
  new (...args: any[]): T;
};

export type Id = string | symbol;
