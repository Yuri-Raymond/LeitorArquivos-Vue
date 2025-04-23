import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

@Controller('generic')
export class GenericController {
  constructor(private readonly service: any) {} // Injeta o serviço genérico

  @Post(':schemaKey')
  async create(@Param('schemaKey') schemaKey: string, @Body() data: Partial<any>): Promise<any> {
    return this.service.create(schemaKey, data);
  }

  @Get(':schemaKey')
  async findAll(@Param('schemaKey') schemaKey: string): Promise<any[]> {
    return this.service.findAll(schemaKey);
  }

  @Get(':schemaKey/:id')
  async findById(@Param('schemaKey') schemaKey: string, @Param('id') id: string): Promise<any> {
    return this.service.findById(schemaKey, id);
  }

  @Delete(':schemaKey/:id')
  async delete(@Param('schemaKey') schemaKey: string, @Param('id') id: string): Promise<any> {
    return this.service.delete(schemaKey, id);
  }
}
