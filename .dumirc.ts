import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/sweety-form',
  // publicPath: '/sweety-form/',
  themeConfig: {
    name: 'sweety-form',
    logo: false,
    lastUpdated: false,
    prefersColor: { default: 'light', switch: false },
  },
});
