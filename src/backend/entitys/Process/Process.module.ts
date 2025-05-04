import { Module } from '@nestjs/common';
import { ProcessController } from './Process.controller';
import { ProcessService } from './Process.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Process, ProcessSchema } from './Process.schema';

@Module({
  controllers: [ProcessController], // Lista de controladores do módulo
  providers: [ProcessService], // Lista de provedores (serviços, guardas, etc.)
  imports: [
    MongooseModule.forFeature([{ name: Process.name, schema: ProcessSchema }]),
  ], // Outros módulos que este módulo precisa
  exports: [ProcessService], // Provedores que podem ser usados por outros módulos
})
export class ProcessModule {}
