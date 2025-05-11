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
  async findById(@Param('codigo') codigo: string): Promise<Discipline> {
    return this.DisciplineService.findById(codigo);
  }

  @Put('Put/:codigo')
  async update(
    @Param('codigo') codigo: string,
    @Body() data: Partial<Discipline>
  ): Promise<Discipline> {
    return this.DisciplineService.update(codigo, data);
  }

  @Put('PutBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBulk(@Body() data: Partial<Discipline>[]): Promise<any> {
    return this.DisciplineService.updateBulk(data);
  }

  @Delete('Delete/:codigo')
  async delete(@Param('codigo') codigo: string): Promise<Discipline> {
    return this.DisciplineService.delete(codigo);
  }
}
