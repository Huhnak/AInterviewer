import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: true,
    // allowedHosts: [
    //   'ainterviewer.creanima.ru',
    //   'frontend-bbon.onrender.com',
    //   'localhost',
    // ],
    // watch: {
    //   usePolling: true,
    // },
    // cors: {
    //   origin: ['https://ainterviewer.creanima.ru'],
    //   credentials: true,
    // },
    // proxy: {
    //   '/api': {
    //     target: 'http://backend:8080',
    //     // target: 'http://localhost:5092',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   // '/hubs': {
    //   //   target: 'http://AInterviewer_backend:8080',
    //   //   ws: true,
    //   //   changeOrigin: true,
    //   //   secure: false,
    //   // }
    // }
  }
})
