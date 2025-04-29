import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import createCustomLogger from './logger';

async function bootstrap() {
  try {
    // Cria a aplicação NestJS usando o módulo principal (AppModule)
    Logger.log('Inicializando a aplicação...');
    const app = await NestFactory.create(AppModule,{
      logger: createCustomLogger(),
    });

    //imporar config
    const configService = app.get(ConfigService);

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
  /*
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
  */

    // Configurações do Swagger
    const config = new DocumentBuilder()
    .setTitle('Instruments API OpenAPI specification')
    .setDescription('API used to [...]')
    .setVersion('0.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

    // Save the swagger.json file in dist folder if the environment is set to local
  if (configService.get<string>('NODE_ENV') === 'local') {
    try {
      fs.writeFileSync('./dist/swagger.json', JSON.stringify(document)); //alterar caminho
    } catch (err) {
      new Logger().error('Error while generating the swagger.json file', err.stack, 'App bootstrap');
    }
  }

    // Inicializa o servidor e define a porta
    const port = process.env.PORT || 8080;
    await app.listen(port);
    Logger.log(`Servidor iniciado na porta ${port}`);
  } catch (error) {
    Logger.error('Erro durante a inicialização:', error);
  }
}

bootstrap();
