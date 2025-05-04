import { Module } from '@nestjs/common';
import { DisciplineController } from './Discipline.controller';
import { DisciplineService } from './Discipline.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Discipline, DisciplineSchema } from './Discipline.schema';

@Module({
  controllers: [DisciplineController], // Lista de controladores do módulo
  providers: [DisciplineService], // Lista de provedores (serviços, guardas, etc.)
  imports: [
    MongooseModule.forFeature([{ name: Discipline.name, schema: DisciplineSchema }]),
  ], // Outros módulos que este módulo precisa
  exports: [DisciplineService], // Provedores que podem ser usados por outros módulos
})
export class DisciplineModule {}
