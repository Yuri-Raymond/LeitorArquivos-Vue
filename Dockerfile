# Imagem base
FROM node:20

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json do backend
COPY src/backend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte do backend
COPY src/backend .

# Expor porta
EXPOSE 3000

# Comando para rodar aplicação em dev
CMD ["npm", "run", "start:dev"]
