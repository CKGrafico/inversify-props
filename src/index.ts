import { Container } from './lib/container';
import { DependencyId, Inject, inject, injectable, mockInject, mockRequest, mockSingleton, mockTransient, resetContainer } from './lib/helpers';

// How to inject a dependency
// @Inject() nameService: INameService;

export const container: Container = new Container();

const cid = DependencyId;

export { Inject, inject, injectable, Container, mockInject, mockRequest, mockSingleton, mockTransient, resetContainer, cid };

