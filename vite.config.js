import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss-webpack-plugin/vite';

const vitePlugins = [uni(),uvwt()]

const postcssPlugins = [require('autoprefixer')(), require('tailwindcss')()];

export default defineConfig({
  plugins: vitePlugins,
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
});