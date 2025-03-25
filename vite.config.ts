import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';  // Importa o plugin para Vue
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src/frontend'),
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
    extensions: ['.js', '.ts', '.vue', '.html'],
    alias: {
      '@': path.resolve(__dirname, 'src/frontend'),  // Ajustado para o diretório de frontend
    }    
    
  },
  build: {
    outDir: path.resolve(__dirname, 'dist/frontend'),
    emptyOutDir: true,  // Adiciona essa linha para limpar o diretório de saída 
    rollupOptions: {
      input: path.resolve(__dirname, 'src/frontend/main.js')  // Verifique se o caminho está correto
    }  
  }
});
