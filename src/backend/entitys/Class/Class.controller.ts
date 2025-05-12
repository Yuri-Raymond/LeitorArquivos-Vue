import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClassService } from './Class.service';
import { Class } from './Class.schema'; // Substitua com o seu esquema real
import { ClassDto } from './Class.Dto';

@Controller('Class')
export class ClassController {
  constructor(private readonly ClassService: ClassService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: ClassDto): Promise<any> {
    return this.ClassService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<Class[]> {
    return this.ClassService.findAll();
  }

  @Get('Get/:codigo')
  async findUnique(@Param('codigo') codigo: string): Promise<Class> {
    return this.ClassService.findByCodigo(codigo);
  }

  @Put('Put/:codigo')
  async update(
    @Param('codigo') codigo: string,
    @Body() data: ClassDto
  ): Promise<Class> {
    return this.ClassService.update(codigo, data);
  }

  @Delete('Delete/:codigo')
  async delete(@Param('codigo') codigo: string): Promise<Class> {
    return this.ClassService.delete(codigo);
  }

}
