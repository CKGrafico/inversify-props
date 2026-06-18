import { setContainer } from './lib/container';
import { idsCache } from './lib/id.helper';

export const container = setContainer();

export const cid = idsCache;

export * from './lib/container';
export * from './lib/id.helper';
export * from './lib/inject.helper';
export * from './lib/mocks.helper';
export * from './lib/parameters.helper';
export * from './lib/inversify.types';
