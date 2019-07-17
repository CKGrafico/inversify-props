import { injectable } from 'inversify';
import { Container } from './lib/container';
import { Inject, inject, DependencyId } from './lib/helpers';

// How to inject a dependency
// @Inject() nameService: INameService;

export const container: Container = new Container();

const cid = DependencyId;

export {
  Inject,
  inject,
  injectable,
  Container,
  cid
};
