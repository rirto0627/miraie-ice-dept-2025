import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 添加这行导入

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, './public')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'localhost'
    ]
  }
})