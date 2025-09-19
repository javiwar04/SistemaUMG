import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7263', // o http://127.0.0.1:5219 según tu backend
        changeOrigin: true,
        secure: false, // permite cert dev
      },
    },
  },
});
