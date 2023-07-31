import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': 'src',
    },
    extensions: ['.ts', '.vue'],
  },
  plugins: [vue()],
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: resolve(__dirname, './src/lib/index.ts'),
      name: 'virtualScrollList',
      formats: ['es', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'nanoid'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
