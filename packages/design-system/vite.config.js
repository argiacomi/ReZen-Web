import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import path from 'path';
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
      '@transitions': path.resolve(__dirname, './components/utils/transitions'),
      '@BaseList': path.resolve(__dirname, './Components/display/List/BaseList')
    }
  },
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'design-system',
      fileName: 'design-system'
    },
    rollupOptions: {
      external: ['react', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'styled-components': 'styled'
        }
      }
    }
  }
});
