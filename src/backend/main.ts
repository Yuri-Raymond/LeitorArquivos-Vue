import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppConfig } from './config/app.config'; // Importa o AppConfig

async function bootstrap() {
  // Cria a aplicação NestJS usando o módulo principal (AppModule)
  const app = await NestFactory.create(AppModule);

  // Instancia o AppConfig e aplica as configurações de CORS
  const appConfig = new AppConfig();
  app.enableCors({
    origin: 'http://localhost:3000', // Permite que o frontend de localhost:3000 acesse o backend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept', // Cabeçalhos permitidos
  });
  // Inicializa o servidor e define a porta
  await app.listen(8080);
  Logger.log('Servidor iniciado na porta 8080');
}

bootstrap();
