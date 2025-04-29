import { Module } from '@nestjs/common';
import { AcademicClassController } from './AcademicClass.controller';
import { AcademicClassService } from './AcademicClass.service';

@Module({
  controllers: [AcademicClassController], // Lista de controladores do módulo
  providers: [AcademicClassService], // Lista de provedores (serviços, guardas, etc.)
  imports: [], // Outros módulos que este módulo precisa
  exports: [AcademicClassService], // Provedores que podem ser usados por outros módulos
})
export class UserModule {}
