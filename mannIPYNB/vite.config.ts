import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.JPEG', '**/*.png', '**/*.PNG'],
  server: {
    port: 5174,
    host: 'localhost'
  }
})
