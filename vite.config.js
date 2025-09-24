import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7263',
        changeOrigin: true,
        secure: false, // Use this if the target server uses self-signed certificates
      },
    },
  },
});
