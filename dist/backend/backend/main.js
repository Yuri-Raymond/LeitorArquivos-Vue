"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
async function bootstrap() {
    try {
        // Inicialização da aplicação NestJS
        common_1.Logger.log('Inicializando a aplicação...');
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
        // Habilitar logs detalhados do Mongoose
        mongoose_1.default.set('debug', process.env.MONGOOSE_DEBUG === 'true');
        // Configurar CORS para o frontend
        app.enableCors({
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'Content-Type, Accept',
        });
        common_1.Logger.log('CORS configurado.');
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
        common_1.Logger.log(`Servidor iniciado na porta ${port}`);
    }
    catch (error) {
        common_1.Logger.error('Erro durante a inicialização:', error);
    }
}
bootstrap();
