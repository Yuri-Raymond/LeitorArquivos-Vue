import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';

@Module({
  controllers: [UserController], // Lista de controladores do módulo
  providers: [UserService], // Lista de provedores (serviços, guardas, etc.)
  imports: [], // Outros módulos que este módulo precisa
  exports: [UserService], // Provedores que podem ser usados por outros módulos
})
export class UserModule {}
