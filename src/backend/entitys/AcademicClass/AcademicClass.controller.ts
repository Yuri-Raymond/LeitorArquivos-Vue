import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AcademicClassService } from './AcademicClass.service';
import { AcademicClass } from './AcademicClass.schema'; // Substitua com o seu esquema real
import { AcademicClassDto } from './AcademicClass.Dto';

@Controller('AcademicClass')
export class AcademicClassController {
  constructor(private readonly AcademicClassService: AcademicClassService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: AcademicClassDto): Promise<any> {
    return this.AcademicClassService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<AcademicClass[]> {
    return this.AcademicClassService.findAll();
  }

  @Get('Get/:id')
  async findById(@Param('id') id: string): Promise<AcademicClass> {
    return this.AcademicClassService.findById(id);
  }

  @Put('Put/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<AcademicClass>
  ): Promise<AcademicClass> {
    return this.AcademicClassService.update(id, data);
  }

  @Delete('Delete/:id')
  async delete(@Param('id') id: string): Promise<AcademicClass> {
    return this.AcademicClassService.delete(id);
  }
}
