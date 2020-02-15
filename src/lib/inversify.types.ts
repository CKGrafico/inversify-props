export type Constructor<T = any> =
  | {
      new (...args: any[]): T;
    }
  | any;

export type Id = string | symbol;

export type IdsCache = {
  [key: string]: Id;
};
