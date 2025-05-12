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

  @Get('Get/:id')
  async findById(@Param('id') id: string): Promise<Bond> {
    return this.BondService.findById(id);
  }

  @Put('Put/:id')
  async update(
    @Param('id') id: string,
    @Body() data: BondDto
  ): Promise<Bond> {
    return this.BondService.update(id, data);
  }

  @Delete('Delete/:id')
  async delete(@Param('id') id: string): Promise<Bond> {
    return this.BondService.delete(id);
  }

}
