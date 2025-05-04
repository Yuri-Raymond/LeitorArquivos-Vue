import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { DisciplineService } from './Discipline.service';
import { Discipline } from './Discipline.schema'; // Substitua com o seu esquema real

@Controller('Discipline')
export class DisciplineController {
  constructor(private readonly DisciplineService: DisciplineService) {}

  @Post('Post')
  async create(@Body() data: Partial<Discipline>): Promise<Discipline> {
    return this.DisciplineService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<Discipline[]> {
    return this.DisciplineService.findAll();
  }

  @Get('Get/:id')
  async findById(@Param('id') id: string): Promise<Discipline> {
    return this.DisciplineService.findById(id);
  }

  @Put('Put/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Discipline>
  ): Promise<Discipline> {
    return this.DisciplineService.update(id, data);
  }

  @Delete('Delete/:id')
  async delete(@Param('id') id: string): Promise<Discipline> {
    return this.DisciplineService.delete(id);
  }
}
