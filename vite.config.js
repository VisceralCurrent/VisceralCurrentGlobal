import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  // For a custom domain (e.g., www.visceralcurrent.com), the base must be '/'
  base: '/',
  
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        research: resolve(__dirname, 'research.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        frequency: resolve(__dirname, 'frequency.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        library: resolve(__dirname, 'library.html'),
        matrix81: resolve(__dirname, 'matrix81.html'),
        realms: resolve(__dirname, 'realms.html'),
        alignment: resolve(__dirname, 'alignment.html'),
        empire: resolve(__dirname, 'empire.html'),
        alignment2: resolve(__dirname, 'alignment-2.html'),
        alignment3: resolve(__dirname, 'alignment-3.html'),
        strategic: resolve(__dirname, 'strategic.html'),
        predictive: resolve(__dirname, 'predictive.html'),
        optimization: resolve(__dirname, 'optimization.html'),
        education: resolve(__dirname, 'education.html'),
        innovations: resolve(__dirname, 'innovations.html'),
        dreamteam: resolve(__dirname, 'dreamteam.html'),
        oracle: resolve(__dirname, 'oracle.html')
      }
    }
  }
})