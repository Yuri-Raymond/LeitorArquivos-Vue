import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Cria a aplicação NestJS usando o módulo principal (AppModule)
  const app = await NestFactory.create(AppModule);

  // Ativa o CORS para permitir que o frontend (Vue.js) acesse o backend (NestJS)
  app.enableCors({
    origin: 'http://localhost:63342',  // Altere para o domínio do seu frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: '*',
    credentials: true,
  });

  // Inicializa o servidor e define a porta
  await app.listen(3000);
  Logger.log('Servidor iniciado na porta 3000');
}

bootstrap();
