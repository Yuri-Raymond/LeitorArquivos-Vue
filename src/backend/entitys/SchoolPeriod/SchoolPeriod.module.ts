import { Module } from '@nestjs/common';
import { SchoolPeriodController } from './SchoolPeriod.controller';
import { SchoolPeriodService } from './SchoolPeriod.service';

@Module({
  controllers: [SchoolPeriodController], // Lista de controladores do módulo
  providers: [SchoolPeriodService], // Lista de provedores (serviços, guardas, etc.)
  imports: [], // Outros módulos que este módulo precisa
  exports: [SchoolPeriodService], // Provedores que podem ser usados por outros módulos
})
export class UserModule {}
