import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DisciplineService } from './Discipline.service';
import { Discipline } from './Discipline.schema'; // Substitua com o seu esquema real
import { DisciplineDto } from './Discipline.Dto';

@Controller('Discipline')
export class DisciplineController {
  constructor(private readonly DisciplineService: DisciplineService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: DisciplineDto): Promise<any> {
    return this.DisciplineService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<Discipline[]> {
    return this.DisciplineService.findAll();
  }

  @Get('Get/:codigo')
  async findUnique(@Param('codigo') codigo: string): Promise<Discipline> {
    return this.DisciplineService.findByCodigo(codigo);
  }

  @Put('Put/:codigo')
  async update(
    @Param('codigo') codigo: string,
    @Body() data: DisciplineDto
  ): Promise<Discipline> {
    return this.DisciplineService.update(codigo, data);
  }

  @Delete('Delete/:codigo')
  async delete(@Param('codigo') codigo: string): Promise<Discipline> {
    return this.DisciplineService.delete(codigo);
  }

}
