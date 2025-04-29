import { Controller, Get, Post, Body, Param, Delete, BadRequestException } from '@nestjs/common';
import { ProcessService } from './Process.service'; // Importa o serviço corretamente

@Controller('generic') // Prefixo base da URL
export class ProcessController {
  constructor(private readonly service: ProcessService) {} // Injeta o serviço genérico

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
      const err = error as Error; // Conversão explícita para o tipo Error
      console.error('Erro ao fazer upload:', err.message);
      throw new BadRequestException(err.message || 'Erro desconhecido');
    }
    
  }

  // Obter todos os itens (GET)
  @Get(':schemaKey/list')
  async findAll(@Param('schemaKey') schemaKey: string): Promise<any[]> {
    try {
      return await this.service.findAll(schemaKey);
    } catch (error) {
      const err = error as Error; // Conversão explícita para o tipo Error
      console.error('Erro ao fazer upload:', err.message);
      throw new BadRequestException(err.message || 'Erro desconhecido');
    }
    
  }

  // Obter item específico por ID (GET)
  @Get(':schemaKey/:id')
  async findById(
    @Param('schemaKey') schemaKey: string,
    @Param('id') id: string
  ): Promise<any> {
    try {
      return await this.service.findById(schemaKey, id);
    } catch (error) {
      const err = error as Error; // Conversão explícita para o tipo Error
      console.error('Erro ao fazer upload:', err.message);
      throw new BadRequestException(err.message || 'Erro desconhecido');
    }
    
  }

  // Deletar item específico (DELETE)
  @Delete(':schemaKey/:id')
  async delete(
    @Param('schemaKey') schemaKey: string,
    @Param('id') id: string
  ): Promise<any> {
    try {
      const deletedItem = await this.service.delete(schemaKey, id);
      return { message: 'Item deletado com sucesso!', deletedItem };
    } catch (error) {
      const err = error as Error; // Conversão explícita para o tipo Error
      console.error('Erro ao fazer upload:', err.message);
      throw new BadRequestException(err.message || 'Erro desconhecido');
    }    
  }
}
