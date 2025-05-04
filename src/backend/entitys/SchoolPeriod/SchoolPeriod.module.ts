import { Module } from '@nestjs/common';
import { SchoolPeriodController } from './SchoolPeriod.controller';
import { SchoolPeriodService } from './SchoolPeriod.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolPeriod, SchoolPeriodSchema } from './SchoolPeriod.schema';

@Module({
  controllers: [SchoolPeriodController], // Lista de controladores do módulo
  providers: [SchoolPeriodService], // Lista de provedores (serviços, guardas, etc.)
  imports: [
    MongooseModule.forFeature([{ name: SchoolPeriod.name, schema: SchoolPeriodSchema }]),
  ], // Outros módulos que este módulo precisa
  exports: [SchoolPeriodService], // Provedores que podem ser usados por outros módulos
})
export class SchoolPeriodModule {}
