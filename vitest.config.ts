/// <reference types="vitest" />
import { mergeConfig, defineConfig } from "vitest/config";
import { defineConfig as defineViteConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const viteConfig = defineViteConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: [
          "node_modules/**",
          ".next/**",
          "coverage/**",
          "**/*.d.ts",
          "**/*.config.{js,ts}",
          "test/**",
        ],
      },
    },
  }),
);
