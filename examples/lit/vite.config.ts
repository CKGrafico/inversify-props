import { defineConfig } from 'vite';

// keepNames: container ids are derived from class names (constructor.name),
// so minification must not mangle them. Legacy decorators (Lit's @customElement
// and inversify-props' @inject) are enabled via experimentalDecorators in
// tsconfig.json.
export default defineConfig({
  esbuild: {
    keepNames: true
  }
});
