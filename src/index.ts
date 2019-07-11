import { injectable } from 'inversify';
import { Container } from './lib/container';
import { Inject } from './lib/helpers';

// How to inject a dependency
// @Inject() nameService: INameService;

export const container: Container = new Container();

export {
  Inject,
  injectable,
  Container
};
