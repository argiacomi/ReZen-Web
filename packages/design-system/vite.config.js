import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import path from 'path';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@hooks': path.resolve(__dirname, './lib/hooks'),
      '@utils': path.resolve(__dirname, './lib/utils'),
      '@icons': path.resolve(__dirname, './lib/icons'),
      '@styles': path.resolve(__dirname, './styles'),
      '@transitions': path.resolve(__dirname, './components/utils/Transitions')
    }
  },
  plugins: [
    react(),
    Unfonts({
      google: {
        families: ['Inter:wght@100..900']
      }
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.js'),
      name: 'design-system',
      fileName: (format) => `design-system.${format}.js`
    }
  }
});
