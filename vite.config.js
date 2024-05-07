import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Set the base path for the project
  build: {
    assetsDir: 'assets', // Specify the directory for static assets
  }
});