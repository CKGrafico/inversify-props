import { setContainer } from './lib/container';
import { idsCache } from './lib/id.helper';

export const container = setContainer({ skipBaseClassChecks: true });

export const cid = idsCache;
