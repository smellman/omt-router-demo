import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  base: '/omt-router-demo/',
  resolve: {
    alias: {
      'omt-router/dist/omt-router.css': fileURLToPath(
        new URL('./node_modules/omt-router/dist/omt-router.css', import.meta.url),
      ),
    },
  },
})
