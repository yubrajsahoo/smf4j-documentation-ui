import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/smf4j-documentation-ui/',
  plugins: [react()],
})
