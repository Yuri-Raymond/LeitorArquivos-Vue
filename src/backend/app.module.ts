import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenericController } from './controllers/file.controller';
import { GenericService } from './services/file.service';
import {AcademicClass, AcademicClassSchema} from './schemas/AcademicClass.schema';
import{Discipline,DisciplineSchema}from './schemas/Discipline.schema';
import{ DisciplineUser, DisciplineUserSchema}from './schemas/DisciplineUser.schema';
import{ SchoolPeriod, SchoolPeriodSchema}from './schemas/SchoolPeriod.schema';
import {User, UserSchema}from './schemas/User.schema';
import{Process,ProcessSchema} from './schemas/Process.schema'; // Importe as classes e schemas
import { Model } from 'mongoose';

@Module({
  imports: [
    // Configuração de conexão com MongoDB (Mongoose)
    MongooseModule.forRoot('mongodb+srv://<caioh>:<caderno2>@squad07-bonsae.hk6xluv.mongodb.net/?retryWrites=true&w=majority&appName=squad07-Bonsae', {
      dbName: 'squad07-Bonsae',
    }),

    // Registro de múltiplos schemas
    MongooseModule.forFeature([
      { name: AcademicClass.name, schema: AcademicClassSchema },
      { name: Discipline.name, schema: DisciplineSchema },
      { name: DisciplineUser.name, schema: DisciplineUserSchema },
      { name: SchoolPeriod.name, schema: SchoolPeriodSchema },
      { name: User.name, schema: UserSchema },
      { name: Process.name, schema: ProcessSchema }
    ]),
  ],
  controllers: [GenericController],
  providers: [
    {
      provide: 'GenericService',
      useFactory: (
        academicClassModel: Model<any>,
        disciplineModel: Model<any>,
        disciplineUserModel: Model<any>,
        schoolPeriodModel: Model<any>,
        userModel: Model<any>,
        processModel: Model<any>
      ) => {
        const modelMap = {
          AcademicClass: academicClassModel,
          Discipline: disciplineModel,
          DisciplineUser: disciplineUserModel,
          SchoolPeriod: schoolPeriodModel,
          User: userModel,
          Process: processModel
        };
        return new (GenericService(modelMap))();
      },
      inject: [
        `${AcademicClass.name}Model`,
        `${Discipline.name}Model`,
        `${DisciplineUser.name}Model`,
        `${SchoolPeriod.name}Model`,
        `${User.name}Model`,
        `${Process.name}Model`
      ],
    },
  ],
})
export class AppModule {}
