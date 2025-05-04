import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import mongoose from 'mongoose';

async function bootstrap() {
  try {
    // Inicialização da aplicação NestJS
    Logger.log('Inicializando a aplicação...');
    const app = await NestFactory.create(AppModule);

    // Habilitar logs detalhados do Mongoose
    mongoose.set('debug', process.env.MONGOOSE_DEBUG === 'true');

    // Configurar CORS para o frontend
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    });
    Logger.log('CORS configurado.');

    // Configuração do Swagger
    /*
    Logger.log('Configurando o Swagger...');
    const config = new DocumentBuilder()
      .setTitle('Instruments API OpenAPI specification')
      .setDescription('API used to manage instruments and related resources.')
      .setVersion('0.0.0')
      .addBearerAuth() // Adiciona suporte a autenticação por token (se necessário)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    Logger.log('Swagger configurado com sucesso.');
    */

    // Inicializa o servidor na porta especificada
    const port = process.env.PORT || 8080;
    await app.listen(port);
    Logger.log(`Servidor iniciado na porta ${port}`);
  } catch (error) {
    Logger.error('Erro durante a inicialização:', error);
  }
}

bootstrap();
