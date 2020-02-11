import { Container, setContainer } from './lib/container';
import {
  DependencyId,
  Inject,
  inject,
  injectable,
  mockInject,
  mockRequest,
  mockSingleton,
  mockTransient,
  resetContainer
} from './lib/helpers';

export const container = setContainer({ skipBaseClassChecks: true });
const cid = DependencyId;

export {
  Inject,
  inject,
  injectable,
  Container,
  mockInject,
  mockRequest,
  mockSingleton,
  mockTransient,
  resetContainer,
  cid
};
