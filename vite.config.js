import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS configuration (leave it as is if you need SCSS support)
      },
    },
  },
  server: {
    port: 5173, // Change the port to your desired one
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy to backend
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: false, // Disable error overlay in the browser
    },
  },
});
