import { Module } from '@nestjs/common';
import { ProcessController } from './Process.controller';
import { ProcessService } from './Process.service';

@Module({
  controllers: [ProcessController], // Lista de controladores do módulo
  providers: [ProcessService], // Lista de provedores (serviços, guardas, etc.)
  imports: [], // Outros módulos que este módulo precisa
  exports: [ProcessService], // Provedores que podem ser usados por outros módulos
})
export class UserModule {}
