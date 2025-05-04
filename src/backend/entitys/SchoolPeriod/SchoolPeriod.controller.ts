import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { SchoolPeriodService } from './SchoolPeriod.service';
import { SchoolPeriod } from './SchoolPeriod.schema'; // Substitua com o seu esquema real

@Controller('SchoolPeriod')
export class SchoolPeriodController {
  constructor(private readonly SchoolPeriodService: SchoolPeriodService) {}

  @Post('Post')
  async create(@Body() data: Partial<SchoolPeriod>): Promise<SchoolPeriod> {
    return this.SchoolPeriodService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<SchoolPeriod[]> {
    return this.SchoolPeriodService.findAll();
  }

  @Get('Get/:id')
  async findById(@Param('id') id: string): Promise<SchoolPeriod> {
    return this.SchoolPeriodService.findById(id);
  }

  @Put('Put/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<SchoolPeriod>
  ): Promise<SchoolPeriod> {
    return this.SchoolPeriodService.update(id, data);
  }

  @Delete('Delete/:id')
  async delete(@Param('id') id: string): Promise<SchoolPeriod> {
    return this.SchoolPeriodService.delete(id);
  }
}
