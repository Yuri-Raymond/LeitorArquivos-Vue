import { Module } from '@nestjs/common';
import { DisciplineController } from './Discipline.controller';
import { DisciplineService } from './Discipline.service';

@Module({
  controllers: [DisciplineController], // Lista de controladores do módulo
  providers: [DisciplineService], // Lista de provedores (serviços, guardas, etc.)
  imports: [], // Outros módulos que este módulo precisa
  exports: [DisciplineService], // Provedores que podem ser usados por outros módulos
})
export class UserModule {}
