import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GenericController } from './controllers/file.controller';
import { GenericService } from './services/file.service';
import { AcademicClass, AcademicClassSchema } from './schemas/AcademicClass.schema';
import { Discipline, DisciplineSchema } from './schemas/Discipline.schema';
import { DisciplineUser, DisciplineUserSchema } from './schemas/DisciplineUser.schema';
import { SchoolPeriod, SchoolPeriodSchema } from './schemas/SchoolPeriod.schema';
import { User, UserSchema } from './schemas/User.schema';
import { Process, ProcessSchema } from './schemas/Process.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis em toda a aplicação
    }),
    MongooseModule.forRoot(process.env.MONGO_URI|| '', {
      dbName: process.env.DB_NAME || 'squad07-Bonsae',
      
      //Nova inserção - ehenon/nestjs-mongodb-api-boilerplate
      /*
        imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
      */
    }),    
    MongooseModule.forFeature([
      { name: AcademicClass.name, schema: AcademicClassSchema },
      { name: Discipline.name, schema: DisciplineSchema },
      { name: DisciplineUser.name, schema: DisciplineUserSchema },
      { name: SchoolPeriod.name, schema: SchoolPeriodSchema },
      { name: User.name, schema: UserSchema },
      { name: Process.name, schema: ProcessSchema },
    ]),
  ],
  controllers: [GenericController],
  providers: [
    {
      provide: 'GenericService',
      useFactory: (
        academicClassModel,
        disciplineModel,
        disciplineUserModel,
        schoolPeriodModel,
        userModel,
        processModel,
      ) => {
        const modelMap = {
          AcademicClass: academicClassModel,
          Discipline: disciplineModel,
          DisciplineUser: disciplineUserModel,
          SchoolPeriod: schoolPeriodModel,
          User: userModel,
          Process: processModel,
        };
        return new GenericService(modelMap);
      },
      inject: [
        'AcademicClassModel',
        'DisciplineModel',
        'DisciplineUserModel',
        'SchoolPeriodModel',
        'UserModel',
        'ProcessModel',
      ],
    },
  ],
})
export class AppModule {}

//Nova exportação - ehenon/nestjs-mongodb-api-boilerplate
/*
  export class AppModule implements NestModule {
    configure(middlewareConsumer: MiddlewareConsumer) {
      // For every route of the app, use the HTTP Logger middleware
      middlewareConsumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
  }
*/