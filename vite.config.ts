import manifest from './manifest.json';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(),''), };
  const pwaOptions: Partial<VitePWAOptions> = {
    base:process.env.ENV_URL,
    strategies: 'injectManifest',
    registerType: 'autoUpdate',
    srcDir: 'public',
    filename: 'sw.js',
    manifest: {
      ...manifest,
      start_url: `${process.env.ENV_SERVER_URL}`,
    },
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    // switch to "true" to enable sw on development
    devOptions:{
      enabled:true
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"],
    },
  };
  return defineConfig({
    base:process.env.ENV_URL,
    plugins: [react(), VitePWA(pwaOptions)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
    },
    preview: {
      port: 8080,
    },
    envPrefix: 'ENV_',
  });
};
