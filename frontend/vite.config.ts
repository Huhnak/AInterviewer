import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // allowedHosts: [
    //   'ainterviewer.creanima.ru'
    // ],
    // hmr: {
    //   host: 'ainterviewer.creanima.ru',
    //   protocol: 'wss',
    //   port: 443,
    //   clientPort: 443
    // },
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
    cors: {
      // origin: ['https://ainterviewer.creanima.ru'],
      credentials: true,
    },
    proxy: {
      '/api': {
        target: 'http://ainterviewer:8080',
        changeOrigin: true,
        secure: false,
      },
      // '/hubs': {
      //   target: 'http://ainterviewer:8080',
      //   ws: true,
      //   changeOrigin: true,
      //   secure: false,
      // }
    }
  }
})