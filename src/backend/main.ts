import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppConfig } from './config/app.config'; // Importa o AppConfig

async function bootstrap() {
  // Cria a aplicação NestJS usando o módulo principal (AppModule)
  const app = await NestFactory.create(AppModule);

  // Instancia o AppConfig e aplica as configurações de CORS
  const appConfig = new AppConfig();
  app.enableCors(appConfig.getCorsConfig());

  // Inicializa o servidor e define a porta
  await app.listen(8080);
  Logger.log('Servidor iniciado na porta 8080');
}

bootstrap();
