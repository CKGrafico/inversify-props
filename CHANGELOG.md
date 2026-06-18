# Changelog

## 3.0.0

Modernized release. **Breaking changes** — review before upgrading.

### Breaking
- Now built on **inversify 8** (was inversify 5).
- **ESM-first** with a dual ESM + CommonJS build and an `exports` map. Bundlers need no change; consuming via `require()` from plain CommonJS Node needs **Node 20.19+ or 22+**.
- `reflect-metadata` is no longer required (inversify 8 bundles it) — you can drop the separate install and the `import 'reflect-metadata'` line.
- The container option `skipBaseClassChecks` was removed (it no longer exists in inversify 8).

### Changed
- TypeScript 5; tests migrated from jest to **vitest**.
- `getContainer()` now lazily creates the default container.
- `Constructor`, `Id` and `IdsCache` types are now exported.

### Added
- GitHub Actions CI and an [agent skill](skills/inversify-props/SKILL.md) (`npx skills add CKGrafico/inversify-props`).
- Rewritten README.

### Notes
- Public API is otherwise unchanged: `container`, `cid`, `@inject`, `addSingleton/addTransient/addRequest`, `mockSingleton/mockTransient/mockRequest`, etc.
- Keep `useDefineForClassFields: false` and ensure your minifier preserves class names (`keepNames`).
