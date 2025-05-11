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
  async findById(@Param('codigo') codigo: string): Promise<Class> {
    return this.ClassService.findById(codigo);
  }

  @Put('Put/:codigo')
  async update(
    @Param('codigo') codigo: string,
    @Body() data: Partial<Class>
  ): Promise<Class> {
    return this.ClassService.update(codigo, data);
  }

  @Put('PutBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBulk(@Body() data: Partial<Class>[]): Promise<any> {
    return this.ClassService.updateBulk(data);
  }

  @Delete('Delete/:codigo')
  async delete(@Param('codigo') codigo: string): Promise<Class> {
    return this.ClassService.delete(codigo);
  }
}
