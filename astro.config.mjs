// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  site: 'https://gabrieldorosh.com',
  output: 'static',
  vite: {
    resolve: {
      // Vite 8's Windows module runner currently evaluates a small number of
      // CommonJS dependencies as ESM. These wrappers keep them in Node's CJS
      // loader until the upstream regression is resolved.
      alias: {
        picomatch: fileURLToPath(
          new URL('./src/utils/picomatch-esm.mjs', import.meta.url),
        ),
        eventemitter3: fileURLToPath(
          new URL('./src/utils/eventemitter3-esm.mjs', import.meta.url),
        ),
        esbuild: fileURLToPath(
          new URL('./src/utils/esbuild-esm.mjs', import.meta.url),
        ),
      },
    },
  },
  redirects: {
    '/predictive-analysis': '/projects/predictive-analysis/',
    '/maidenhead-central': '/projects/maidenhead-central/',
    '/qr-code-generator': '/projects/qr-code-generator/',
    '/sudoku-solver': '/projects/sudoku-solver/',
  },
});
