import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// keepNames: container ids are derived from class names (constructor.name),
// so minification must not mangle them. Legacy decorators (@inject) are
// enabled via experimentalDecorators in tsconfig.json.
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    keepNames: true
  }
});
