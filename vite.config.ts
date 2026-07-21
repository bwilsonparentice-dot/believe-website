import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Believe Studio — The World Map
// A single-page, cinematic, editorial web experience.
export default defineConfig({
  plugins: [react()],
  server: { host: true },
})
