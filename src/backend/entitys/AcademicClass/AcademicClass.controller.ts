import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { AcademicClassService } from './AcademicClass.service';
import { AcademicClass } from './AcademicClass.schema'; // Substitua com o seu esquema real

@Controller('AcademicClass')
export class AcademicClassController {
  constructor(private readonly AcademicClassService: AcademicClassService) {}

  @Post('Post')
  async create(@Body() data: Partial<AcademicClass>): Promise<AcademicClass> {
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
