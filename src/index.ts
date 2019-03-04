import { injectable } from 'inversify';
import { Container } from './container';
import { Inject } from './helpers';

// How to inject a dependency
// @Inject() nameService: INameService;

export const container: Container = new Container();

export {
  Inject,
  injectable
};
