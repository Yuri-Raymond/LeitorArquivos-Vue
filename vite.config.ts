import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';  // Importa o plugin para Vue

export default defineConfig({
  plugins: [vue()],  // Adiciona o plugin Vue
  server: {
    port: 3000,  // Define a porta que o frontend (Vue) irá rodar
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Proxy para o backend
        changeOrigin: true,
        secure: false,
      },
    },
    
  },
  resolve: {
    alias: {
      '@': '/src/frontend',  // Ajuste para apontar para o diretório de frontend
    },
    
  },
  root: 'src/frontend',
  build: {
    outDir: 'dist/frontend',
    rollupOptions: {
      input: './main.js' // Caminho do arquivo de entrada.
    }  
  },
});
