// X:\cse470-pet-adoption-app\frontend\vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⭐ THIS IS THE REQUIRED CONFIGURATION FOR VITE ⭐
  server: {
    proxy: {
      // When the frontend tries to access /api, forward the request to http://localhost:5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, 
        secure: false,
      },
    },
  },
});