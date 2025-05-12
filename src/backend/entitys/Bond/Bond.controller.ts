import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { BondService } from './Bond.service';
import { Bond } from './Bond.schema'; // Substitua com o seu esquema real
import { BondDto } from './Bond.Dto';

@Controller('Bond')
export class BondController {
  constructor(private readonly BondService: BondService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: BondDto): Promise<any> {
    return this.BondService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<Bond[]> {
    return this.BondService.findAll();
  }

  @Get('Get/:matricula')
  async findUnique(@Param('matricula') matricula: string): Promise<Bond> {
    return this.BondService.findByMatricula(matricula);
  }

  @Put('Put/:matricula')
  async update(
    @Param('matricula') matricula: string,
    @Body() data: BondDto
  ): Promise<Bond> {
    return this.BondService.update(matricula, data);
  }

  @Delete('Delete/:matricula')
  async delete(@Param('matricula') matricula: string): Promise<Bond> {
    return this.BondService.delete(matricula);
  }

}
