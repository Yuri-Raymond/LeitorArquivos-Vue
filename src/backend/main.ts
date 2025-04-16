import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    // Cria a aplicação NestJS usando o módulo principal (AppModule)
    Logger.log('Inicializando a aplicação...');
    const app = await NestFactory.create(AppModule);

    // Configura CORS para o frontend
    app.enableCors({
      origin: 'http://localhost:3000', // Permite que o frontend de localhost:3000 acesse o backend
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
      allowedHeaders: 'Content-Type, Accept', // Cabeçalhos permitidos
    });
    Logger.log('Aplicação inicializada, configurando o Swagger...');

    // Configurações do Swagger
    const config = new DocumentBuilder()
      .setTitle('API Example')
      .setDescription('Descrição da API')
      .setVersion('1.0')
      .addTag('example')
      .build();

    // Cria o documento Swagger e configura o endpoint
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    Logger.log('Swagger configurado com sucesso');

    // Inicializa o servidor e define a porta
    const port = process.env.PORT ?? 8000;
    await app.listen(port);
    Logger.log(`Servidor iniciado na porta ${port}`);
  } catch (error) {
    Logger.error('Erro durante a inicialização:', error);
  }
}

bootstrap();
