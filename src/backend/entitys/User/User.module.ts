import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './User.schema';

@Module({
  controllers: [UserController], // Lista de controladores do módulo
  providers: [UserService], // Lista de provedores (serviços, guardas, etc.)
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ], // Outros módulos que este módulo precisa
  exports: [UserService], // Provedores que podem ser usados por outros módulos
})
export class UserModule {}
