import { injectable } from 'inversify';
import { Container, DependencyId } from './lib/container';
import { Inject } from './lib/helpers';

// How to inject a dependency
// @Inject() nameService: INameService;

export const container: Container = new Container();

const cid = DependencyId;

export {
  Inject,
  injectable,
  Container,
  cid
};
