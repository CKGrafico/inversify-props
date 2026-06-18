export interface INameService {
  name(): string;
}

export class NameService implements INameService {
  name(): string {
    return 'inversify-props';
  }
}
