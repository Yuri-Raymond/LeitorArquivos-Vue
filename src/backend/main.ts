import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    // Cria a aplicação NestJS usando o módulo principal (AppModule)
    Logger.log('Inicializando a aplicação...');
    const app = await NestFactory.create(AppModule);

     // Defina o prefixo global, se necessário
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    /*
    const port = process.env.BACKEND_PORT || 8080;
    await app.listen(port);
    
    Logger.log(`Servidor iniciado na porta ${port}`);
    */

    // Configura CORS para o frontend
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Permite que o frontend definido no .env acesse o backend
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
      allowedHeaders: 'Content-Type, Accept', // Cabeçalhos permitidos
    });
    Logger.log('Aplicação inicializada, configurando o Swagger...');

   // Log dos endpoints
  const server = app.getHttpServer();
  const router = server._events.request._router;
 
  const routes = router.stack
    .filter((layer: any) => layer.route)
    .map((layer: any) => {
      const { path, methods } = layer.route;
      return { path: `${globalPrefix}/${path}`, methods: Object.keys(methods).join(', ').toUpperCase() };
    });

  Logger.log('Lista de Endpoints:');
  routes.forEach((route: { path: string; methods: string }) => {
    Logger.log(`${route.methods}: ${route.path}`);
  });

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
    const port = process.env.PORT || 8080;
    await app.listen(port);
    Logger.log(`Servidor iniciado na porta ${port}`);
  } catch (error) {
    Logger.error('Erro durante a inicialização:', error);
  }
}

bootstrap();
