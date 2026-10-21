import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      {
        find: /^((?:@[^/]+\/)?[^/@]+)@\d[^/]*(\/.*)?$/,
        replacement: '$1$2',
      },
      {
        find: '@/styles',
        replacement: path.resolve(__dirname, './src/styles'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src/app'),
      },
    ],
  },
})
