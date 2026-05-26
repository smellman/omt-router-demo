import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      'omt-router/dist/omt-router.css': fileURLToPath(
        new URL('./node_modules/omt-router/dist/omt-router.css', import.meta.url),
      ),
      'omt-router': fileURLToPath(
        new URL('./node_modules/omt-router/dist/omt-router.js', import.meta.url),
      ),
    },
  },
})
