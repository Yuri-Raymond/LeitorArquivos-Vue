import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenericController } from './controllers/file.controller';
import { GenericService } from './services/file.service';
import {
  AcademicClass,
  AcademicClassSchema,
  Discipline,
  DisciplineSchema,
  DisciplineUser,
  DisciplineUserSchema,
  SchoolPeriod,
  SchoolPeriodSchema,
  User,
  UserSchema
} from './schemas/folder.schema'; // Importe as classes e schemas
import { Model } from 'mongoose';

@Module({
  imports: [
    // Configuração de conexão com MongoDB (Mongoose)
    MongooseModule.forRoot('mongodb+srv://caiohchagas92:5CPhcHUgyIUCIAvr@squad07-bonsae.hk6xluv.mongodb.net/squad07-Bonsae?retryWrites=true&w=majority', {
      dbName: 'squad07-Bonsae',
    }),

    // Registro de múltiplos schemas
    MongooseModule.forFeature([
      { name: AcademicClass.name, schema: AcademicClassSchema },
      { name: Discipline.name, schema: DisciplineSchema },
      { name: DisciplineUser.name, schema: DisciplineUserSchema },
      { name: SchoolPeriod.name, schema: SchoolPeriodSchema },
      { name: User.name, schema: UserSchema }
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
        userModel: Model<any>
      ) => {
        const modelMap = {
          AcademicClass: academicClassModel,
          Discipline: disciplineModel,
          DisciplineUser: disciplineUserModel,
          SchoolPeriod: schoolPeriodModel,
          User: userModel,
        };
        return new (GenericService(modelMap))();
      },
      inject: [
        `${AcademicClass.name}Model`,
        `${Discipline.name}Model`,
        `${DisciplineUser.name}Model`,
        `${SchoolPeriod.name}Model`,
        `${User.name}Model`,
      ],
    },
  ],
})
export class AppModule {}
