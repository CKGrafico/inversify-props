export type Constructor<T = any> = {
  new (...args: any[]): T;
};

export type Id = string | symbol;

export type CachedId = {
  id: Id;
  name: string;
};

export type IdsCache = {
  [key: string]: CachedId;
};
