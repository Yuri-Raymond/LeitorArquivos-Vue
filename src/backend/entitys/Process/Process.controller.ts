import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProcessService } from './Process.service';
import { Process } from './Process.schema'; // Substitua com o seu esquema real
import { ProcessDto } from './Process.Dto';

@Controller('Process')
export class ProcessController {
  constructor(private readonly ProcessService: ProcessService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: ProcessDto): Promise<any> {
    return this.ProcessService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<Process[]> {
    return this.ProcessService.findAll();
  }

  @Get('Get/:id')
  async findById(@Param('id') id: string): Promise<Process> {
    return this.ProcessService.findById(id);
  }

  @Put('Put/:id')
  async update(
    @Param('id') id: string,
    @Body() data: ProcessDto
  ): Promise<Process> {
    return this.ProcessService.update(id, data);
  }

  @Delete('Delete/:id')
  async delete(@Param('id') id: string): Promise<Process> {
    return this.ProcessService.delete(id);
  }

}
