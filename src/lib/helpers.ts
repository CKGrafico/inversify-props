// import { injectable as __injectable } from 'inversify';
// import { container } from '..';

// /**
//  * Help Injectable to cache id if necessary
//  */
// export function injectable(customId?: string) {
//   return function(target: any) {
//     cacheId(customId, injectId(target));
//     return __injectable()(target);
//   };
// }

// /**
//  * After container is generated, mock an existing dependency as Singleton
//  */
// export function mockSingleton<T>(
//   id: string | symbol,
//   to: {
//     new (...args: any[]): T;
//   }
// ) {
//   container.unbind(id);
//   container.addSingleton<T>(to, id);
// }

// /**
//  * After container is generated, mock an existing dependency as Transient
//  */
// export function mockTransient<T>(
//   id: string | symbol,
//   to: {
//     new (...args: any[]): T;
//   }
// ) {
//   container.unbind(id);
//   container.addTransient<T>(to, id);
// }

// /**
//  * After container is generated, mock an existing dependency as Request
//  */
// export function mockRequest<T>(
//   id: string | symbol,
//   to: {
//     new (...args: any[]): T;
//   }
// ) {
//   container.unbind(id);
//   container.addRequest<T>(to, id);
// }
