import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { DisciplineService } from './Discipline.service';

@Controller('api') // Prefixo base da URL
export class DisciplineController {
  constructor(private readonly service: DisciplineService) {}

  // Criar item (POST)
  @Post(':schemaKey')
  async create(
    @Param('schemaKey') schemaKey: string,
    @Body() data: Record<string, any>
  ) {
    try {
      const result = await this.service.create(schemaKey, data);
      return { message: 'Item criado com sucesso!', result };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao criar item:', error.message);
        throw new BadRequestException(error.message || 'Erro desconhecido');
      } else {
        console.error('Erro não identificado:', error);
        throw new BadRequestException('Erro desconhecido');
      }
    }
  }

  // Obter todos os itens (GET)
  @Get(':schemaKey')
  async findAll(@Param('schemaKey') schemaKey: string): Promise<any[]> {
    try {
      return await this.service.findAll(schemaKey);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao criar item:', error.message);
        throw new BadRequestException(error.message || 'Erro desconhecido');
      } else {
        console.error('Erro não identificado:', error);
        throw new BadRequestException('Erro desconhecido');
      }
    }
  }

  // Obter item por ID (GET)
  @Get(':schemaKey/:id')
  async findById(
    @Param('schemaKey') schemaKey: string,
    @Param('id') id: string
  ): Promise<any> {
    try {
      return await this.service.findById(schemaKey, id);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao criar item:', error.message);
        throw new BadRequestException(error.message || 'Erro desconhecido');
      } else {
        console.error('Erro não identificado:', error);
        throw new BadRequestException('Erro desconhecido');
      }
    }
  }

  // Atualizar item por ID (PUT)
  @Put(':schemaKey/:id')
  async update(
    @Param('schemaKey') schemaKey: string,
    @Param('id') id: string,
    @Body() data: Record<string, any>
  ) {
    try {
      const updatedItem = await this.service.update(schemaKey, id, data);
      return { message: 'Item atualizado com sucesso!', updatedItem };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao criar item:', error.message);
        throw new BadRequestException(error.message || 'Erro desconhecido');
      } else {
        console.error('Erro não identificado:', error);
        throw new BadRequestException('Erro desconhecido');
      }
    }
  }

  // Deletar item por ID (DELETE)
  @Delete(':schemaKey/:id')
  async delete(
    @Param('schemaKey') schemaKey: string,
    @Param('id') id: string
  ): Promise<any> {
    try {
      const deletedItem = await this.service.delete(schemaKey, id);
      return { message: 'Item deletado com sucesso!', deletedItem };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao criar item:', error.message);
        throw new BadRequestException(error.message || 'Erro desconhecido');
      } else {
        console.error('Erro não identificado:', error);
        throw new BadRequestException('Erro desconhecido');
      }
    }
  }
}
