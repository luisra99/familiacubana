/// <reference types="vitest" />

import * as path from "path";

import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { defineConfig, loadEnv } from "vite";

import inject from "@rollup/plugin-inject";
import manifest from "./manifest.json";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  const pwaOptions: Partial<VitePWAOptions> = {
    base: process.env.ENV_BASE_URL,
    strategies: "injectManifest",
    registerType: "autoUpdate",
    srcDir: "public",
    filename: "sw.js",
    manifest: {
      ...manifest,
      start_url: "https://sri-familiacubana.xutil.cu",
    },
    includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
    // switch to "true" to enable sw on development
    devOptions: {
      enabled: true,
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"],
    },
  };
  return defineConfig({
    base: process.env.ENV_BASE_URL,
    plugins: [
      react(),
      VitePWA(pwaOptions),
      nodePolyfills({
        globals: {
          Buffer: true,
        },
      }),
    ],
    server: {
      port: 8080,
    },
    preview: {
      port: 8080,
    },
    envPrefix: "ENV_",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      root: path.resolve(__dirname, "./src"),
    },
    build: {
      rollupOptions: {
        plugins: [
          inject({
            Buffer: ["buffer", "Buffer"],
          }),
        ],
      },
    },
  });
};
