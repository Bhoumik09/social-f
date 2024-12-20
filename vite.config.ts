// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever framework you're using

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target:'https://socio-backend-theta.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})