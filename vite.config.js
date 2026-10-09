import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Two entry pages: the café and its brand kit.
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        brand: 'brand.html',
      },
    },
  },
});
