import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Ajusta según la ubicación de tu proyecto
  plugins: [react()],
  build: {
    outDir: 'dist', // Ajusta según tu preferencia
  },
});
