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

  @Get('Get/:id')
  async findById(@Param('id') id: string): Promise<Class> {
    return this.ClassService.findById(id);
  }

  @Put('Put/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Class>
  ): Promise<Class> {
    return this.ClassService.update(id, data);
  }

  @Delete('Delete/:id')
  async delete(@Param('id') id: string): Promise<Class> {
    return this.ClassService.delete(id);
  }
}
