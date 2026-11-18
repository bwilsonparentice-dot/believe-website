import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// A single-file review copy of Create Believers alone, with illustrative
// examples and no connection. See scripts/build-cb-preview.mjs.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: { 'import.meta.env.VITE_CB_PREVIEW': JSON.stringify('1'), 'import.meta.env.VITE_CB_SUPABASE_URL': JSON.stringify(''), 'import.meta.env.VITE_CB_SUPABASE_KEY': JSON.stringify('') },
  publicDir: false,
  build: { outDir: 'dist-cb-preview', rollupOptions: { input: 'cb-preview.html' }, cssCodeSplit: false, assetsInlineLimit: 100000000, chunkSizeWarningLimit: 100000 },
})
