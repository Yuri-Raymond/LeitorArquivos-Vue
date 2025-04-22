import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';
import { User } from './models/user-entity'; // Substitua pelo caminho correto para suas entidades
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from '../schemas/folder.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: 'mongodb+srv://<caiohchagas92>:<5CPhcHUgyIUCIAvr>@squad07-bonsae.hk6xluv.mongodb.net/?retryWrites=true&w=majority&appName=squad07-Bonsae', // URL do Atlas
      type: 'mongodb', // Define o tipo do banco de dados como MongoDB
      host: 'localhost', // Host do MongoDB
      port: 27017, // Porta padrão do MongoDB
      database: 'squad07-Bonsae', // Nome do banco de dados
      entities: [User], // Entidades registradas
      synchronize: true, // Use apenas em desenvolvimento; sincroniza automaticamente o esquema com o banco
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs_project'),
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
    TypeOrmModule.forFeature([User]), // Registro da entidade no escopo do módulo
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class AppModule {}
