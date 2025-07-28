import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'  // ✅ This was missing

//import react from '@vitejs/plugin-react'  //this thing is giving error ig

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react(), tsconfigPaths()],
})
