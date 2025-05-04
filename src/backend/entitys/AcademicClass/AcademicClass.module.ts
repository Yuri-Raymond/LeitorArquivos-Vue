import { Module } from '@nestjs/common';
import { AcademicClassController } from './AcademicClass.controller';
import { AcademicClassService } from './AcademicClass.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicClass, AcademicClassSchema } from './AcademicClass.schema';


@Module({
  controllers: [AcademicClassController], // Lista de controladores do módulo
  providers: [AcademicClassService], // Lista de provedores (serviços, guardas, etc.)
  imports: [
    MongooseModule.forFeature([{ name: AcademicClass.name, schema: AcademicClassSchema }]),
  ], // Outros módulos que este módulo precisa
  exports: [AcademicClassService], // Provedores que podem ser usados por outros módulos
})
export class AcademicClassModule {}
