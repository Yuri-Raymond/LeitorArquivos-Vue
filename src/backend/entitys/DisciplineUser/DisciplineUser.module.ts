import { Module } from '@nestjs/common';
import { DisciplineUserController } from './DisciplineUser.controller';
import { DisciplineUserService } from './DisciplineUser.service';

@Module({
  controllers: [DisciplineUserController], // Lista de controladores do módulo
  providers: [DisciplineUserService], // Lista de provedores (serviços, guardas, etc.)
  imports: [], // Outros módulos que este módulo precisa
  exports: [DisciplineUserService], // Provedores que podem ser usados por outros módulos
})
export class UserModule {}
